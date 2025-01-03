import * as z from "zod";
import { UpdateListOrder } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { ListOrg } from "@prisma/client";

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionState<InputType, ListOrg[]>;
