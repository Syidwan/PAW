import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return <SignUp afterSignUpUrl="/select-org"  afterSignInUrl="/select-org"/>;
}
