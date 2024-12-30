"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";
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
    list = await prisma.listOrg.delete({
      where: {
        id,
        boardOrgId,
        boardOrg: {
          orgId,
        },
      },
    });

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.DELETE,
    // });
  } catch (error) {
    return {
      error: "Failed to Delete the List!",
    };
  }

  revalidatePath(`/board-org/${boardOrgId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
