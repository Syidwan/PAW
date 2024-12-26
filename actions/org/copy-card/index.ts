"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }


  const { id, boardOrgId } = data;

  let card;

  try {
    const CardToCopy = await prisma.cardOrg.findUnique({
      where: {
        id,
        listOrg: {
          boardOrg: {
            orgId,
          },
        }

      },
    });

    if (!CardToCopy) {
      return { error: "Card not found!" };
    }

    const lastCard = await prisma.cardOrg.findFirst({
      where: {
        listOrgId: CardToCopy.listOrgId,
      },
      orderBy: { order: "desc" },
      select: { order: true}
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await prisma.cardOrg.create({
      data: {
        name: `${CardToCopy.name} - Copy`,
        description: CardToCopy.description,
        order: newOrder,
        listOrgId: CardToCopy.listOrgId
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

  revalidatePath(`/board-org/${boardOrgId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
