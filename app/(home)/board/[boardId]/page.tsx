import React from 'react'
import {getBoardsById} from "@/lib/data"
import { notFound } from 'next/navigation';
import { PageProps } from '@/.next/types/app/layout';

const Board = async ({ params }: PageProps)  => {
  const { boardId } = await params;
  if (!boardId) {
    throw new Error("Board ID is missing in the route parameters.");
  }
  const data = await getBoardsById(boardId);
  if (!data) return notFound();
  return (
    <div>
      <h1 className="text-2xl">Board Details</h1>
      {/* Menampilkan data board dengan JSON.stringify */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
   </div>
  )
}

export default Board