"use client";
import { CheckCircleIcon } from "lucide-react";
import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-md"
        >
          <div className="flex items-center justify-between gap-5">

          {data.name}
          {data.checklist && (
              <CheckCircleIcon 
                className="h-5 w-5 text-emerald-500"
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
