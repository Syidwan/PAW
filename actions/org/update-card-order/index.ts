"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }

  const { items, boardOrgId } = data;

  let updatedCards;

  try {
    const transaction = items.map((cardOrg) =>
      prisma.cardOrg.update({
        where: {
          id: cardOrg.id,
          listOrg: {
            boardOrg: {
              orgId,
            },
          }
        },
        data: {
          order: cardOrg.order,
          listOrgId: cardOrg.listOrgId,
        },
      })
    );

    updatedCards = await prisma.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to Reorder!",
    };
  }

  revalidatePath(`/board-org/${boardOrgId}}`);
  return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
