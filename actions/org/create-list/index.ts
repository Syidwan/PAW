"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized!",
    };
  }

  const { title, boardOrgId } = data;

  let list;
  
  try {
    const board = await prisma.boardOrg.findUnique({
      where: {
        id: boardOrgId,
        orgId
      },
    });
    console.log(board)
    if (!board) {
      return { error: "Board not found!" };
      
    }

    const lastList = await prisma.listOrg.findFirst({
      where: { boardOrgId: boardOrgId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await prisma.listOrg.create({
      data: {
        name: title,
        boardOrgId,
        order: newOrder,
      },
    });

    // await createAuditLog({
    //   entityTitle: list.name,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.CREATE,
    // });
  } catch (error) {
    return {
      error: "Failed to Create the List!",
    };
  }

  revalidatePath(`/board-org/${boardOrgId}}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
