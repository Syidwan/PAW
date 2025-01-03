"use client";

import { createCard } from "@/actions/org/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { forwardRef, useRef, ElementRef, KeyboardEventHandler } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  listOrgId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listOrgId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<HTMLFormElement | null>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.name}" created!`);
        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef as React.RefObject<HTMLElement>, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listOrgId = formData.get("listId") as string;
      const boardOrgId = params.boardOrgId as string;

      execute({ title, listOrgId, boardOrgId });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4 "
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextareaKeyDown}
            ref={ref}
            errors={fieldErrors}
            placeholder="Enter a title for this card..."
          />
          <input hidden id="listId" name="listId" defaultValue={listOrgId} />
          <div className="flex justify-between items-center gap-x-1">
            <FormSubmit className="text-base-100">Add card</FormSubmit>
            <Button size={"sm"} variant={"ghost"} onClick={disableEditing}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2 ">
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a Card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
