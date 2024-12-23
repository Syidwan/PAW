"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // For client-side navigation
import { createBoard } from "@/lib/actions"; // Import server action

const CreateBoardForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [boardName, setBoardName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!session?.user?.id) {
      setError("User not authenticated");
      return;
    }

    const formData = new FormData(event.target as HTMLFormElement);
    const userId = session.user.id;

    try {
      const result = await createBoard(formData, userId);
      if (result?.newBoardId) {
        console.log("Redirecting to board:", result.newBoardId);
        router.push(`/board/${result.newBoardId}`); // Redirect to the new board
      } else {
        setError("Failed to create board");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
    if (e.target.value) {
      setError(""); // Clear error if input is valid
    }
  };

  const isButtonDisabled = !boardName;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="mb-2 block text-xs font-regular">
          Create New Board
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter Board Title"
          className="block w-full rounded-md border border-gray-300 focus:border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-200 py-1 px-2 text-black"
          value={boardName}
          onChange={handleChange}
        />
		  </div>
		  <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            Board name required
          </span>
        </div>

      {error && (
        <div
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-red-500 mt-2"
        >
          {error}
        </div>
      )}

      <div className="mb-3">
        <button
          type="submit"
          className={`${
            isButtonDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#82CBFF] hover:bg-[#266CA9]"
          } text-white px-4 py-2 rounded-lg w-full mt-5`}
          disabled={isButtonDisabled} // Disable the button when input is empty
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateBoardForm;
