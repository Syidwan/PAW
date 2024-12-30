import React from 'react'
import { getBoardsById } from "@/lib/data-org"
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image'
import { updateBoardAccess } from '@/lib/actions-org';
import NavbarBoard from '../../_components/navbar-board';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { ListContainer } from '../../_components/list-container';

interface BoardIdPageProps {
  params: Promise<{
    boardOrgId: string;
  }>;
}

const BoardPage = async ({ params }: BoardIdPageProps) => {
  const { boardOrgId } = await params;
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const data = await getBoardsById(boardOrgId);
  if (!data) return notFound();


  const backgroundImage = data.background || "/default-background.jpg"; // gunakan background dari data.board atau default


  const lists = await prisma.listOrg.findMany({
    where: {
      boardOrgId: boardOrgId,
      boardOrg: {
        orgId,
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
      <NavbarBoard boardOrgId={data.id} boardName={data.name}  />
      <div className="p-4 h-full overflow-x-auto pt-20">
        {/* <div className="text-base-content p-6 rounded-md bg-gray-200 w-64 h-full mt-20 border-gray-400 border-2">
          <h1 className="text-3xl font-bold">Board Details</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div> */}
        <ListContainer boardOrgId={boardOrgId} data={lists} />
      </div>
    </div>
  )
}

export default BoardPage
