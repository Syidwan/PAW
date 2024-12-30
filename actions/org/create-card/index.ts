"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }

  const { title, boardOrgId, listOrgId } = data;

  let card;

  try {
    const list = await prisma.listOrg.findUnique({
      where: {
        id: listOrgId,
        boardOrg: {
          orgId,
        },
      },
    });

    if (!list) {
      return {
        error: "List not found!",
      };
    }

    const lastCard = await prisma.cardOrg.findFirst({
      where: {
        listOrgId,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await prisma.cardOrg.create({
      data: {
        name: title,
        listOrgId,
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

  revalidatePath(`/board-org/${boardOrgId}}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
