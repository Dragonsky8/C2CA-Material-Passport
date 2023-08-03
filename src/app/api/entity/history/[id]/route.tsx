import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { forUser } from "../../../../../../lib/prisma";

// Fetch one specific entity history info
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const identifier = params.id; // 'a', 'b', or 'c'
//   const res = await prisma.material.findFirst({
//     where: { id: parseInt(identifier) },
//   });
  const res = await prisma.materialVersion.findMany({
    where: {versionMaterialId: parseInt(identifier)}
  })
  // console.log(res)
  return NextResponse.json(res);
  // return NextResponse.json(JSON.stringify({ test: `${identifier}` }));
}
