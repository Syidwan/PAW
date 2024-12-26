"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyList } from "./schema";
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

  let list;

  try {
    const listToCopy = await prisma.listOrg.findUnique({
      where: {
        id,
        boardOrgId,
        boardOrg: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return { error: "List not found!" };
    }

    const lastList = await prisma.listOrg.findFirst({
      where: {
        boardOrgId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await prisma.listOrg.create({
      data: {
        boardOrgId: listToCopy.boardOrgId,
        name: `${listToCopy.name} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((cardOrg) => ({
              name: cardOrg.name,
              description: cardOrg.description,
              order: cardOrg.order,
            })),
          },
        },
      },
      include: {
        cards: true,
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
      error: "Failed to Copy the List!",
    };
  }

  revalidatePath(`/board-org/${boardOrgId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);
