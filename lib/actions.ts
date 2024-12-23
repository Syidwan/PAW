"use server";
import { RegisterSchema, SignInSchema } from "./zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { getBoardsById } from "./data";

export const signUpCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return { message: "Failed to register user" };
  }
  redirect("/login");
};

//Sign In Credentials
export const signInCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return { message: "User not found." };
    }
    await signIn("credentials", {
      email,
      password,
      redirectTo: `/dashboard/${user.id}`,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials." };
        default:
          return { message: "Something went wrong." };
      }
    }
    throw error;
  }
};

// lib/actions/boardActions.ts

export const createBoard = async (formData: FormData, userId: string) => {
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
    const newBoard = await prisma.board.create({
      data: {
        name,
        user: {
          connect: { id: userId }, // Connect the board to the user by userId
        },
        background,
        lastAccessed: new Date(),
      },
    });
    console.log("Board created successfully");
    // Revalidate the dashboard page to show the new board
    revalidatePath(`/dashboard/${userId}`);

    return { message: "Board created successfully", newBoardId: newBoard.id  };
  } catch (error) {
    console.error("Failed to create board:", error);
    return { message: "Failed to create board" };
   }
   
};

export const updateBoardAccess = async (boardId: string) => {
  const data = await getBoardsById(boardId);
  try {
    await prisma.board.update({
      data: {
        lastAccessed: new Date(), // Set waktu sekarang
      },
      where: { id: boardId }
    });

  } catch (error) {
    console.error("Failed to update access:", error);
    return { message: "Failed to update access" };
  }

};