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
