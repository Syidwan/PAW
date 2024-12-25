/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Menambahkan Promise pada params
type Props = {
  params: Promise<{
    cardId: string;
  }>;
};

export async function GET(req: Request, props: Props) {
  // Menunggu params yang berbentuk Promise untuk diselesaikan
  const { cardId } = await props.params;

  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const card = await prisma.card.findUnique({
      where: {
        id: cardId,
        list: {
          board: {
            userId,
          },
        },
      },
      include: {
        list: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!card) {
      return new NextResponse("Card not found", { status: 404 });
    }

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
