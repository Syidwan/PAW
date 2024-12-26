import * as z from "zod";

export const DeleteList = z.object({
  id: z.string(),
  boardOrgId: z.string(),
});
