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