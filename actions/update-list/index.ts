 "use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateList } from "./schema";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";
// import { createAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  const userId = session?.user.id

  if (!userId) {
    return {
      error: "Unauthorized!",
    };
  }

  const { title, id, boardId } = data;

  let list;

  try {
    list = await prisma.list.update({
      where: {
        id,
        boardId,
        board: {
          userId,
        },
      },
      data: {
        name: title,
      },
    });

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.UPDATE,
    // });
  } catch (error) {
    return {
      error: "Failed to Update the List!",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
