import FormLogin from "@/components/auth/form-login";
import { GoogleButton } from "@/components/auth/social-button";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex flex-wrap content-center justify-center rounded-lg bg-white w-[24rem] h-[32rem]">
      <div className="w-72">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">Log in</h1>
          <div className="text-gray-400">
            Don't have an account yet?
            <Link
              href="/register"
              className="text-xs font-semibold text-black underline"
            >
              Sign up
            </Link>
          </div>
        </div>
        <FormLogin />
        <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 mb-0 text-center font-semibold text-gray-600">
            Or
          </p>
        </div>
        <GoogleButton />
      </div>
    </div>
  );
};

export default Login;
