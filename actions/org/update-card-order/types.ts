import * as z from "zod";
import { UpdateCardOrder } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { CardOrg } from "@prisma/client";

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputType, CardOrg[]>;
