/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Menambahkan Promise pada params
type Props = {
  params: Promise<{
    cardOrgId: string;
  }>;
};

export async function GET(req: Request, props: Props) {
  // Menunggu params yang berbentuk Promise untuk diselesaikan
  const { cardOrgId } = await props.params;

  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const card = await prisma.cardOrg.findUnique({
      where: {
        id: cardOrgId,
        listOrg: {
          boardOrg: {
            orgId,
          },
        },
      },
      include: {
        listOrg: {
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
