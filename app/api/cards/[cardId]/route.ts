import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { cardId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const cardId = context.params.cardId;

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

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}