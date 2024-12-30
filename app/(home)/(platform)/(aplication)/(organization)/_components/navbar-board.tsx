import React from "react";
import { DeleteButtonOrg } from "@/components/button";
interface NavbarBoardProps {
	boardOrgId: string; // or `number`, depending on your boardId type
	boardName: string;
}

const NavbarBoard: React.FC<NavbarBoardProps> = ({ boardOrgId, boardName}) => {
  console.log(boardOrgId)
  return (
	  <div className="navbar bg-transparent fixed z-0" >
		<div className="absolute inset-0 bg-gray-900 backdrop-blur-sm opacity-60 pointer-events-none z-[-1]"></div>
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
			  <DeleteButtonOrg boardOrgId={boardOrgId} />
      </div>
    </div>
  );
};

export default NavbarBoard;
