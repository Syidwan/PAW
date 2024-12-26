"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateListOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }

  const { items, boardOrgId } = data;

  let lists;

  try {
    const transaction = items.map((listOrg) =>
      prisma.listOrg.update({
        where: {
          id: listOrg.id,
          boardOrg: {
            orgId,
          },
        },
        data: {
          order: listOrg.order,
        },
      })
    );

    lists = await prisma.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to Reorder!",
    };
  }

  revalidatePath(`/board-org/${boardOrgId}}`);
  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
