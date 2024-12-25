import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

/* @next-codemod-ignore: Use `PageParams` type for dynamic route params */
export async function GET(
  req: Request,
  { params }: { params: { cardId: string } } // Abaikan error di sini
) {
  try {
    const { cardId } = params; // Tidak perlu await di params
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

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
