"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useState } from "react";
import { signUpCredentials } from "@/lib/actions";
import { RegisterButton } from "../button";

const FormRegister = () => {
  const [state, formAction] = useActionState(signUpCredentials, null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action={formAction} className="mt-4">
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
          htmlFor="name"
          className="mb-2 block text-xs font-regular"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Your Name"
          className="block w-full rounded-md border border-gray-300 focus:border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-200 py-1 px-2 text-black"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.name}
          </span>
        </div>
      </div>
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
          placeholder="Email"
          className="block w-full rounded-md border border-gray-300 focus:border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-200 py-1 px-1.5 text-black"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.email}
          </span>
        </div>
      </div>
      <div className="mb-3">
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
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.password}
          </span>
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="ConfirmPassword"
          className="mb-2 block text-xs font-regular"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="ConfirmPassword"
          value={formData.ConfirmPassword}
          onChange={handleChange}
          placeholder="*******"
          className="block w-full rounded-md border border-gray-300 focus:border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-200 py-1 px-1.5 text-black"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.ConfirmPassword}
          </span>
        </div>
      </div>
      <div className="mb-3">
      <RegisterButton />
      </div>
      {/* <p className="text-sm font-light text-gray-500">
        Already have an account?
        <Link href="/login">
          <span className="font-medium pl-1 text-blue-600 hover:text-blue-700">
            Sign in
          </span>
        </Link>
      </p> */}
    </form>
  );
};

export default FormRegister;
