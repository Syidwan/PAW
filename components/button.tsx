"use client";
import { useFormStatus } from "react-dom";
import { signOut } from "next-auth/react";
import { deleteBoard } from "@/lib/actions";

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

export const SignOutButton = () => {
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

export const DeleteButton = ({ boardId }: { boardId: string }) => {
  const deleteBoardWithId = deleteBoard.bind(null, boardId);
  
  return (
    <>
      <label
        htmlFor="my_modal_6"
        className="btn rounded-md bg-red-800 border-none text-white hover:bg-red-700"
      >
        Delete
      </label>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Delete</h3>
          <p className="py-4">Are you sure you want to delete this board?</p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Cancel
            </label>
            <form action={deleteBoardWithId} className="rounded-md bg-red-700 hover:bg-red-500">
              <DeleteBtn/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const DeleteBtn = () => {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn btn-ghost text-base-100" disabled={pending}>
      {pending ? (<span className="loading loading-spinner"></span>) : ("Delete")}
    </button>
  )
}

export const CreateBtn = ({status}:{status:boolean}) => {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className={`${
      status
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-[#82CBFF] hover:bg-[#266CA9]"
    } text-white px-4 py-2 rounded-lg w-full mt-5`}
    disabled={status || pending}
  >
      {pending ? (<span className="loading loading-spinner"></span>) : ("Delete")}
    </button>
  )
}

