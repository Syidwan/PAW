"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";
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
    const CardToCopy = await prisma.card.findUnique({
      where: {
        id,
        list: {
          board: {
            userId,
          },
        }

      },
    });

    if (!CardToCopy) {
      return { error: "Card not found!" };
    }

    const lastCard = await prisma.card.findFirst({
      where: {
        listId: CardToCopy.listId,
      },
      orderBy: { order: "desc" },
      select: { order: true}
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await prisma.card.create({
      data: {
        name: `${CardToCopy.name} - Copy`,
        description: CardToCopy.description,
        order: newOrder,
        listId: CardToCopy.listId
      },
    });

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.CREATE,
    // });
  } catch (error) {
    return {
      error: "Failed to Copy",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
