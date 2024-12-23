"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createBoard } from "@/lib/actions"; // Import server action
import Image from "next/image";

const CreateBoardForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [boardName, setBoardName] = useState("");
  const [background, setBackground] = useState("/background/bg1.jpg"); // Default background

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!session?.user?.id) {
      setError("User not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append("name", boardName);
    formData.append("background", background);

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
        <label
          htmlFor="name"
          className="mb-2 block text-xs font-regular text-center"
        >
          Create New Board
        </label>
        <div className="my-2 mb-6">
          <label htmlFor="name" className="mb-2 block text-xs font-regular">
            Choose Background
          </label>
          <div className="grid grid-cols-4 gap-1">
            {[
              "/background/bg1.jpg",
              "/background/bg2.jpg",
              "/background/bg3.jpg",
              "/background/bg4.jpg",
            ].map((bg, index) => (
              <div
                key={index}
                className={`relative cursor-pointer rounded-sm overflow-hidden ${
                  background === bg
                    ? "border-2 border-blue-500"
                    : "border border-black"
                }`}
                onClick={() => setBackground(bg)} // Update background on click
              >
                <Image
                  src={bg}
                  alt={`bg${index + 1}`}
                  width={90}
                  height={50}
                  className="object-cover"
                />
                {background === bg && (
                  <div className="absolute inset-0 border-2 border-blue-500 rounded-sm pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <label htmlFor="name" className="mb-2 block text-xs font-regular">
          Input Board Name
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
          disabled={isButtonDisabled}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateBoardForm;
