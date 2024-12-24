import React from 'react'
import { getBoardsById } from "@/lib/data"
import { notFound } from 'next/navigation';
import { PageProps } from '@/.next/types/app/layout';
import Image from 'next/image'
import { updateBoardAccess } from '@/lib/actions';
import NavbarBoard from '@/components/navbarBoard';

const BoardPage = async ({ params }: PageProps) => {
  const { boardId } = await params;
  if (!boardId) {
    throw new Error("Board ID is missing in the route parameters.");
  }
  const data = await getBoardsById(boardId);
  if (!data) return notFound();

  await updateBoardAccess(boardId);

  const backgroundImage = data.background || "/default-background.jpg"; // gunakan background dari data.board atau default

  return (
    
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <NavbarBoard boardId={data.id} boardName={data.name} userId={data.userId} />
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        <div className="text-white p-6 rounded-lg bg-opacity-70 bg-black">
          <h1 className="text-3xl font-bold mb-4">Board Details</h1>
          {/* Menampilkan data board dengan JSON.stringify */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

export default BoardPage
