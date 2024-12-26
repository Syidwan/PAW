import { prisma } from "./prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


export const getBoards = async (orgId: string) => {
	try {
		const boards = await prisma.boardOrg.findMany({
			where: {
				orgId: orgId,
		  },
		});
		return boards;
	 } catch (error) {
		console.error('Failed to fetch boards:', error);
		return [];
	 }
}

export const getBoardsById = async (boardOrgId: string) => {
	if (!boardOrgId) {
		console.error("boardOrgId is undefined or invalid");
		return null; // atau lempar error jika perlu
	 }
  
	try {
	  const board = await prisma.boardOrg.findUnique({
		 where: {
			id: boardOrgId, // Mencari board berdasarkan ID
		 },
	  });
 
	  return board; // Mengembalikan data board
	} catch (error) {
	  console.error('Failed to fetch board:', error);
	  return null; // Mengembalikan null jika terjadi kesalahan
	}
};


 
 