import { prisma } from "./prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getUsers = async () => {
	const session = await auth()
	if (!session || !session.user || session.user.role !== "admin") redirect(`/dashboard/$(session.user.id)`)
	
	try {
		const users = await prisma.user.findMany()
		return users
	} catch (error) {
		console.log(error)
	}
}

export const getBoards = async (userId: string) => {
	try {
		const boards = await prisma.board.findMany({
		  where: {
			 userId: userId, // Filter boards by the userId
		  },
		});
		return boards;
	 } catch (error) {
		console.error('Failed to fetch boards:', error);
		return [];
	 }
}

export const getBoardsById = async (boardId: string) => {
	try {
	  const board = await prisma.board.findUnique({
		 where: {
			id: boardId, // Mencari board berdasarkan ID
		 },
	  });
 
	  return board; // Mengembalikan data board
	} catch (error) {
	  console.error('Failed to fetch board:', error);
	  return null; // Mengembalikan null jika terjadi kesalahan
	}
 };