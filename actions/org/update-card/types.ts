import * as z from "zod";
import { UpdateCard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { CardOrg } from "@prisma/client";

export type InputType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionState<InputType, CardOrg>;
