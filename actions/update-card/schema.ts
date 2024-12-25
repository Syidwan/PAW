import * as z from "zod";

export const UpdateCard = z.object({
  title: z.optional(
    z
      .string({
        required_error: "Title is required!",
        invalid_type_error: "Title is required!",
      })
      .min(3, {
        message: "Title is too short!",
      })
  ),
  id: z.string(),
  boardId: z.string(),
  checklist: z.optional(z.boolean()),
  description: z.optional(
    z
      .string({
        required_error: "Description is required!",
        invalid_type_error: "Description is required!",
      })
      .min(3, {
        message: "Description is too short!",
      })
  ),
});
