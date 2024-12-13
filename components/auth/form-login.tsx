"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useState } from "react";
import { signInCredentials } from "@/lib/actions";
import { LoginButton, RegisterButton } from "../button";

const FormLogin = () => {
  const [state, formAction] = useActionState(signInCredentials, null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action={formAction} className="mt-12">
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg"
          role="alert"
        >
          <span className="font-medium">{state?.message}</span>
        </div>
      ) : null}


      <div className="mb-3">
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-regular"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="block w-full rounded-md border border-gray-300 focus:border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-200 py-1 px-1.5 text-black"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.email}
          </span>
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-xs font-regular"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="*******"
          className="block w-full rounded-md border border-gray-300 focus:border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-200 py-1 px-1.5 text-black"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.password}
          </span>
        </div>
      </div>
      <div className="mb-3">
      <LoginButton />

      </div>
      {/* <p className="text-sm font-light text-gray-500">
         Don&apos;t have an account yet?
        <Link href="/register">
          <span className="font-medium pl-1 text-blue-600 hover:text-blue-700">
            Sign Up here
          </span>
        </Link>
      </p> */}
    </form>
  );
};

export default FormLogin;
