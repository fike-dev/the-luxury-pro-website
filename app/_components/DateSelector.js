"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservationContext } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ cabin, settings, bookedDates }) {
  const { range, setRange, resetRange } = useReservationContext();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  // CABINS
  const { regularPrice, discount } = cabin;

  const numNights = Number(
    differenceInDays(displayRange.to, displayRange.from)
  );
  const cabinPrice = (regularPrice - discount) * numNights;
  // console.log(bookedDates);
  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between text-sm">
      <DayPicker
        className="pt-12 place-self-center mx-auto"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-3  md:px-8 bg-accent-500 text-primary-800 h-[50px] md:h-[70px]">
        <div className="flex items-center gap-3 md:gap-6">
          <p className="flex gap-2 items-center">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="md:text-2xl text-xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-xl md:text-2xl flex flex-nowrap gap-1">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className=" text-sm md:text-lg font-bold uppercase">
                  Total
                </span>{" "}
                <span className="text-xl md:text-2xl font-semibold">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
