"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  const userId = session?.user.id

  if (!userId) {
    return {
      error: "Unauthorized!",
    };
  }

  const { id, boardId } = data;

  let card;

  try {
    card = await prisma.card.delete({
      where: {
        id, list:{board:{userId}}
      }
    })
  } catch (error) {
    return {
      error: "Failed to Delete!",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
