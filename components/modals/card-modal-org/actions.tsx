"use client";

import { copyCard } from "@/actions/org/copy-card"
import { deleteCard } from "@/actions/org/delete-card";
import { updateCard } from "@/actions/org/update-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardOrgWithList } from "@/types";
import { Check, Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionsProps {
  data: CardOrgWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.name}" copied!`);
        cardModal.onClose();
      },
      onError: (error) => { 
        toast.error(error);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.name}" deleted!`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeUpdateCard, isLoading: isLoadingUpdate } = useAction(
    updateCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.name}" Updated!`);
        cardModal.onClose()
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardOrgId = params.boardOrgId as string;

    executeCopyCard({
      id: data.id,
      boardOrgId,
    });
  };

  const onDelete = () => {
    const boardOrgId = params.boardOrgId as string;

    executeDeleteCard({
      id: data.id,
      boardOrgId,
    });
  };

  const onToggleChecklist = () => {
    const boardOrgId = params.boardOrgId as string;

    executeUpdateCard({
      id: data.id,
      boardOrgId,
      checklist: !data.checklist,
    });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="gray"
        size="inline"
        onClick={onToggleChecklist}
        disabled={isLoadingUpdate}
        className={`w-full justify-start ${
          data.checklist ? 'bg-green-500 hover:bg-green-600 text-white' : ''
        }`}
      >
        <Check className={`h-4 w-4 mr-2 ${
          data.checklist ? 'text-white' : ''
        }`} />
        {data.checklist ? 'Completed' : 'Mark as complete'}
      </Button>
      <Button
        variant="gray"
        size="inline"
        onClick={onCopy}
        disabled={isLoadingCopy}
        className="w-full justify-start"
      >
        <Copy className="h-4 w-4 mr-2" /> Copy
      </Button>
      <Button
        variant="gray"
        size="inline"
        onClick={onDelete}
        disabled={isLoadingDelete}
        className="w-full justify-start"
      >
        <Trash className="h-4 w-4 mr-2" /> Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};