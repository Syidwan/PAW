"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }

  const { id, boardOrgId, ...values } = data;

  let card;

  try {
    card = await prisma.cardOrg.update({
      where: {
        id,
        listOrg: {
          boardOrg: {
            orgId,
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

  revalidatePath(`/board-org/${id}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
