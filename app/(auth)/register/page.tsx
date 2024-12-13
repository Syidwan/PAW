import FormRegister from "@/components/auth/form-register";
import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center rounded-r-lg bg-white p-8 w-[60%] h-full">
      <div className="w-72">
        <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl font-semibold">Create Account</h1>
              <div className="text-gray-400 text-xs">
                Already have an account? 
                <Link href="/login" className="text-xs font-semibold text-black underline">Log in</Link>
              </div>
        </div>
        <FormRegister />
      </div>
    </div>
  );
};

export default Register;
