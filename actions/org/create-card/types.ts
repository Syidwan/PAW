import * as z from "zod";
import { CreateCard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { CardOrg } from "@prisma/client";

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType, CardOrg>;
