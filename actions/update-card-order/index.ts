"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  const userId = session?.user.id

  if (!userId) {
    return {
      error: "Unauthorized!",
    };
  }

  const { items, boardId } = data;

  let updatedCards;

  try {
    const transaction = items.map((card) =>
      prisma.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              userId,
            },
          }
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    updatedCards = await prisma.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to Reorder!",
    };
  }

  revalidatePath(`/board/${boardId}}`);
  return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
