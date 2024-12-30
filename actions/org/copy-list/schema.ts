import * as z from "zod";

export const CopyList = z.object({
  id: z.string(),
  boardOrgId: z.string(),
});
