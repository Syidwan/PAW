"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";
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

  const { id, boardId, ...values } = data;

  let card;

  try {
    card = await prisma.card.update({
      where: {
        id,
        list: {
          board: {
            userId,
          },
        },
      },
      data: {
        ...values,
      },
    });

    // await createAuditLog({
    //   entityTitle: card.title,
    //   entityId: card.id,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.UPDATE,
    // });
  } catch (error) {
    return {
      error: "Failed to Update the Card!",
    };
  }

  revalidatePath(`/board/${id}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
