import { IoLogoGoogle } from "react-icons/io5";
import { signIn } from "@/auth";
export const GoogleButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="flex items-center justify-center gap-1 py-2.5 rounded-lg uppercase text-white fonst-medium text-sm bg-blue-500 w-full"
      >
        <IoLogoGoogle />
        Sign In with Google
      </button>
    </form>
  );
};
