"use client";

import { List, ListOrg } from "@prisma/client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/org/delete-list";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";
import { copyList } from "@/actions/org/copy-list";

interface ListOptionsProps {
  data: ListOrg;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.name}" deleted!`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.name}" copied!`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardOrgId = formData.get("boardId") as string;

    executeDelete({ id, boardOrgId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardOrgId = formData.get("boardId") as string;

    executeCopy({ id, boardOrgId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="h-auto w-auto p-2 hover:bg-gray-300">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align={"start"} className="px-0 py-3 ">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4 ">
          List Actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant={"ghost"}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 "
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          variant={"ghost"}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:bg-gray-300"
        >
          Add Card
        </Button>
        <form action={onCopy}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardOrgId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:bg-gray-300"
          >
            Copy List
          </FormSubmit>
        </form>
        <Separator className="bg-neutral-500 " />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardOrgId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:bg-gray-300"
          >
            Delete this List
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
