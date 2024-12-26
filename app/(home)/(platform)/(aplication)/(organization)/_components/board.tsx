// components/Board.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { updateBoardAccess } from "@/lib/actions";

interface BoardProps {
  id: string;
  name: string;
  boardBg: string;
  lastAccess: Date | null;
}

const Board: React.FC<BoardProps> = ({ id, name, boardBg }) => {

  const backgroundImage = boardBg || "/img/bgproject.jpg";
  return (
    <Link href={`/board-org/${id}`}>
      <div
        className="bg-cover bg-center h-40 shadow-md relative"
        style={{ backgroundImage: `url(${backgroundImage})` }} // Menggunakan background image
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <h2 className="text-white text-lg font-bold absolute top-2 left-2">
            {name}
          </h2>
        </div>
        <Image
          src="/img/partisipasi.png" // Pastikan path dimulai dengan "/img/" tanpa public
          alt="Type"
          className="absolute bottom-2 left-2 w-6 h-6"
          width={24}
          height={24}
        />
      </div>
    </Link>
  );
};

export default Board;

export const BoardRecents: React.FC<BoardProps> = ({ id, name, boardBg, lastAccess }) => {
  const backgroundImage = boardBg || "/img/bgproject.jpg";
  const formattedLastAccess = lastAccess
    ? new Date(lastAccess).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : "No access yet";
  return (
    <Link href={`/board-org/${id}`}>
      <div className="flex flex-row">
        <Image
          src={backgroundImage}
          alt={"bgrecent"}
          width={40}
          height={30}
          className="border border-1 border-black rounded-md"
        />
        <div className="mx-2">{name}</div>
        {/* <div>{formattedLastAccess}</div> */}
      </div>
    </Link>
  );
};
