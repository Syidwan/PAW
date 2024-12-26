"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";
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
    card = await prisma.cardOrg.delete({
      where: {
        id, listOrg:{boardOrg:{orgId}}
      }
    })
  } catch (error) {
    return {
      error: "Failed to Delete!",
    };
  }

  revalidatePath(`/board-org/${boardOrgId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
