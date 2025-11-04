import SignInButtonWithGoogle from "@/app/_components/SignInButtonWithGoogle";
import SignInWithGitHub from "@/app/_components/SignInWithGitHub";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButtonWithGoogle />
      <SignInWithGitHub />
    </div>
  );
}
