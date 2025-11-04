import { signInWithGoogleAction } from "@/app/_lib/actions";
import SignIn from "./SignIn";

function SignInButtonWithGoogle() {
  return <SignIn action={signInWithGoogleAction} provider={"Google"} />;
}

export default SignInButtonWithGoogle;
