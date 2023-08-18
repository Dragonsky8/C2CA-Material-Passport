import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { forUser } from "../../../../../../lib/prisma";

// Fetch one specific entity use info
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const identifier = params.id; // 'a', 'b', or 'c'
  //   const res = await prisma.material.findFirst({
  //     where: { id: parseInt(identifier) },
  //   });
  const res = await prisma.use.findUnique({
    where: { id: parseInt(identifier) },
  });
  // console.log(res)
  return NextResponse.json(res);
  // return NextResponse.json(JSON.stringify({ test: `${identifier}` }));
}

export async function PATCH(
  request: Request,
  {
    body,
  }: {
    body: {
      id: number;
      name: String;
      producer: String;
      mixture: String;
    };
  }
) {
  const req = await request.json();
  const data = req.data;
  const userId = req.userId;
  const dbId = parseInt(data.id);
  // Try to add new entity. Catch the error when it fails
  try {
    const user = await prisma.users.findFirstOrThrow();
    const userPrisma = prisma.$extends(forUser(userId));
    const res = await userPrisma.use.update({
      where: { id: dbId },
      data: data,
    });
    return new NextResponse(JSON.stringify("good"), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    // It failed to update
    console.log("update failed", e);
    return new NextResponse(JSON.stringify("hgelp"), {
      status: 406,
      headers: { "Content-Type": "application/json" },
    });
  }
}
