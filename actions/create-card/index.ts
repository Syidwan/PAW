"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      error: "Unauthorized!",
    };
  }

  const { title, boardId, listId } = data;

  let card;

  try {
    const list = await prisma.list.findUnique({
      where: {
        id: listId,
        board: {
          userId,
        },
      },
    });

    if (!list) {
      return {
        error: "List not found!",
      };
    }

    const lastCard = await prisma.card.findFirst({
      where: {
        listId,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await prisma.card.create({
      data: {
        name: title,
        listId,
        order: newOrder,
      },
    });

    // await createAuditLog({
    //   entityId: card.id,
    //   entityTitle: card.title,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.CREATE,
    // });
  } catch (error) {
    return {
      error: "Failed to Create the Card!",
    };
  }

  revalidatePath(`/board/${boardId}}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
