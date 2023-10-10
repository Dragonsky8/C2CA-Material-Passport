import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { forUser } from "../../../../../lib/prisma";

// Fetch one specific entity info
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const identifier = params.id; // 'a', 'b', or 'c'
  const res = await prisma.materialProductLink.findFirst({
    where: { epcId: identifier },
  });
  return NextResponse.json(res);
  // return NextResponse.json(JSON.stringify({ test: `${identifier}` }));
}

// Create a new complete material page
export async function POST(request: Request) {
  const req = await request.json();
  const data = req.data;
  const rfidInfo = req.rfidInfo;
  const userId = req.userId;
  console.log(rfidInfo);

  // Add production date
  data.dateOfProduction = new Date();
  // Add materialType to Raw, as registering a new RFID is always Raw
  data.materialType = "Raw";
  console.log(data);
  // Try to add new entity. Catch the error when it fails
  try {
    const userPrisma = prisma.$extends(forUser(userId));
    const res = await userPrisma.material.create({
      data: data,
    });
    console.log("res is giving id: ", res.id);
    // create additional entries in other categories
    await userPrisma.rawMaterial.create({
      data: {
        id: res.id,
      },
    });
    // Register every RFID scanned with the new rawMaterial entry
    // Once done with subPages, create MaterialProductLink entry to link raw material + product
    Object.values(rfidInfo).map(async (linkValue) => {
      await userPrisma.materialProductLink.create({
        data: {
          materialId: res.id,
          // @ts-ignore
          epcId: linkValue, /// TODO: Fix this TS warning
        }, 
      });
    });

    // Return redicrect url if everything succeeded
    return NextResponse.redirect(
      new URL(`/rawmaterial/${res.id}`, request.url)
    );
  } catch (e: any) {
    // It failed to update
    console.log("update failed", e);
    return new NextResponse(JSON.stringify("hgelp"), {
      status: 406,
      headers: { "Content-Type": "application/json" },
    });
  }
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
  console.log("HIIIWE" + data.rfidId);
  const userId = req.userId;
  const dbId = parseInt(data.id);
  // Try to add new entity. Catch the error when it fails
  try {
    // const user = await prisma.users.findFirst(userId)
    const userPrisma = prisma.$extends(forUser(userId));
    const res = await userPrisma.materialProductLink.update({
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
