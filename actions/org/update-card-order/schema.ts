import * as z from "zod";

export const UpdateCardOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      order: z.number(),
      listOrgId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  boardOrgId: z.string(),
});
