"use server"
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { getBoardsById } from "./data-org";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createBoard = async (formData: FormData, orgId: string) => {
  // Convert formData entries to an object
  const validatedFields = Object.fromEntries(formData.entries());
  const background = formData.get("background") as string;
  // Ensure 'name' is a string
  const name = validatedFields.name;
  if (typeof name !== "string") {
    console.error("Board name must be a string");
    return { message: "Board name must be a string" };
  }

  // Proceed with board creation
  try {
    // Use Prisma or your backend method here to create the board
    const newBoard = await prisma.boardOrg.create({
      data: {
        name,
        orgId,
        background,
        lastAccessed: new Date(),
      },
    });
    console.log("Board created successfully");
    // Revalidate the dashboard page to show the new board
    revalidatePath(`/organization/${orgId}`);

    return { message: "Board created successfully", newBoardId: newBoard.id  };
  } catch (error) {
    console.error("Failed to create board:", error);
    return { message: "Failed to create board" };
   }
   
};

export const updateBoardAccess = async (boardOrgId: string) => {
  const data = await getBoardsById(boardOrgId);
  try {
    await prisma.boardOrg.update({
      data: {
        lastAccessed: new Date(), // Set waktu sekarang
      },
      where: { id: boardOrgId }
    });

  } catch (error) {
    console.error("Failed to update access:", error);
    return { message: "Failed to update access" };
  }
};

export const deleteBoardOrg = async (boardOrgId: string): Promise<void> => {
  const data = await getBoardsById(boardOrgId);
  if (!data) throw new Error("Board not found");

  try {
    await prisma.boardOrg.delete({
      where: { id: boardOrgId },
    });
  } catch (error) {
    throw new Error("Failed to delete board");
  }

  // Set a cookie to indicate successful deletion
  const cookieStore = await cookies();
  cookieStore.set("deleteBoard", "true", {
    maxAge: 3000, 
    path: "/", // Make the cookie available globally
  });

  // Redirect to the dashboard page
  revalidatePath(`/organization/${data.orgId}`);
  redirect(`/organization/${data.orgId}`);
};