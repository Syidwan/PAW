import * as z from "zod";

export const UpdateListOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  boardOrgId: z.string(),
});
