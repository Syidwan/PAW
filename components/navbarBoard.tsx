import React from "react";
import { DeleteButton } from "./button";
interface NavbarBoardProps {
	boardId: string; // or `number`, depending on your boardId type
	userId: string;
	boardName: string;
}

const NavbarBoard: React.FC<NavbarBoardProps> = ({ boardId, boardName, userId }) => {
  console.log(boardId)
  return (
	  <div className="navbar bg-transparent fixed" >
		<div className="absolute inset-0 bg-black blur-sm opacity-30 pointer-events-none z-[-1]"></div>
      <div className="flex-1">
			  <a className="btn btn-ghost text-base-100 text-xl">{boardName}</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost text-base-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
				  </svg>
			  </button>
			  <DeleteButton boardId={boardId} />
      </div>
    </div>
  );
};

export default NavbarBoard;
