import { signInWithGitHubAction } from "@/app/_lib/actions";
import SignIn from "./SignIn";

function SignInWithGitHub() {
  return <SignIn action={signInWithGitHubAction} provider={"GitHub"} />;
}

export default SignInWithGitHub;
