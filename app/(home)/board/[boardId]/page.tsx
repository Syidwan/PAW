import React from 'react'
import { getBoardsById } from "@/lib/data"
import { notFound, redirect } from 'next/navigation';
import { PageProps } from '@/.next/types/app/layout';
import Image from 'next/image'
import { updateBoardAccess } from '@/lib/actions';
import NavbarBoard from '@/components/navbar-board';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { ListContainer } from '@/components/list-container';


const BoardPage = async ({ params }: PageProps) => {
  const { boardId } = await params;
  const session = await auth()
  if (!boardId) {
    throw new Error("Board ID is missing in the route parameters.");
  }
  const data = await getBoardsById(boardId);
  if (!data) return notFound();

  await updateBoardAccess(boardId);

  const backgroundImage = data.background || "/default-background.jpg"; // gunakan background dari data.board atau default
  if (session?.user.id != data.userId) {
    redirect(`/dashboard/${session?.user.id}`)
  } else if (!session?.user.id) {
    redirect("/login")
  }

  const lists = await prisma.list.findMany({
    where: {
      boardId: boardId,
      board: {
        userId: session.user.id,
      }
    },
    include: {
      cards: {
        orderBy: {
          order: "asc"
        }
      }
    },
    orderBy: {
      order:"asc"
    }
  })

  return (
    
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <NavbarBoard boardId={data.id} boardName={data.name} userId={data.userId} />
      <div className="p-4 h-full overflow-x-auto pt-20">
        {/* <div className="text-base-content p-6 rounded-md bg-gray-200 w-64 h-full mt-20 border-gray-400 border-2">
          <h1 className="text-3xl font-bold">Board Details</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div> */}
        <ListContainer boardId={boardId} data={lists} />
      </div>
    </div>
  )
}

export default BoardPage
