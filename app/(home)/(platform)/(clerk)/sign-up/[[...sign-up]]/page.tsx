import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return <SignUp signInForceRedirectUrl="/select-org"/>;
}
