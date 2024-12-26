import * as z from "zod";

export const CopyCard = z.object({
  id: z.string(),
  boardOrgId: z.string(),
});
