"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect, RedirectType } from "next/navigation";

export async function signInWithGoogleAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signInWithGitHubAction() {
  await signIn("github", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session?.user) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!nationality) throw new Error("Please provide a valid nationality.");

  if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a vlaid nationalID.");

  const updateData = {
    nationality,
    nationalID,
    countryFlag,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error)
    throw new Error("Something went wrong while updating your profile");

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session?.user)
    throw new Error("You must be logged in to perfom this operation");

  // Object.entries(formData.entries())

  // We can use zod here for data validation but let's make it simple
  const newBooking = {
    ...bookingData,
    numGuests: +formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    guestId: session.user.guestId,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  // console.log(newBooking);

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou", RedirectType.replace);
}

export async function updateBooking(formData) {
  // 1) Authentication
  const session = await auth();
  if (!session?.user)
    throw new Error("You must be logged in to perfom this operation.");

  const bookingId = formData.get("bookingId");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (guestBookingIds.includes(bookingId))
    throw new Error("You are not authorized to update this booking.");

  const numGuests = +formData.get("numGuests");
  const observations = formData.get("observations");

  const updateData = {
    numGuests,
    observations: observations.slice(0, 1000),
  };

  // 3) Mutation
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  if (error) throw new Error("Something went wrong updating reservation.");

  // 4) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath(`/account/reservations`);

  // 5) Redirecting
  redirect("/account/reservations", RedirectType.replace);
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session?.user) throw new Error("You must be logged in.");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not authorized to delete this booking.");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) throw new Error("Reservation couldn't be deleted.");

  revalidatePath("/account/reservations");
}
