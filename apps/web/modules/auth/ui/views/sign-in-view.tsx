import { SignIn } from "@clerk/nextjs";

function SignInView() {
  return <SignIn routing="hash" />;
}

export default SignInView;
