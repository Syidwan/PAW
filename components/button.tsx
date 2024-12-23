"use client";
import { useFormStatus } from "react-dom";

export const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#82CBFF] text-white px-4 py-2 rounded-lg w-full hover:bg-[#266CA9]"
    >
      {pending ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        "Create an account"
      )}
    </button>
  );
};

export const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#82CBFF] text-white px-4 py-2 rounded-lg w-full hover:bg-[#266CA9]"
    >
      {pending ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        "Sign In"
      )}
    </button>
  );
};


import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Hindari reload halaman
        handleSignOut();
      }}
      className="flex w-full"
    >
      <button
        type="submit"
        className="hover:bg-blue-100 px-4 py-2 cursor-pointer w-full text-start"
      >
        Log Out
      </button>
    </form>
  );
};

export default SignOutButton;
