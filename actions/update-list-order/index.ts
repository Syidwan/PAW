"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateListOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  const userId = session?.user.id

  if (!userId) {
    return {
      error: "Unauthorized!",
    };
  }

  const { items, boardId } = data;

  let lists;

  try {
    const transaction = items.map((list) =>
      prisma.list.update({
        where: {
          id: list.id,
          board: {
            userId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await prisma.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to Reorder!",
    };
  }

  revalidatePath(`/board/${boardId}}`);
  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
