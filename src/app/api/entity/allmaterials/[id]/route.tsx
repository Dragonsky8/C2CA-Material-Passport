import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { forUser } from "../../../../../../lib/prisma";

// Fetch linked rawMaterial entities, based on productId
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const identifier = params.id; // 'a', 'b', or 'c'

  const res = await prisma.materialProductLink.findMany({
    where: { productId: parseInt(identifier) },
  });
  var materialArray = new Array();
  res.map((entry) => {
    materialArray.push(entry.materialId);
  });

  const materialList = await prisma.material.findMany({
    where: {
      id: { in: materialArray },
    },
  });

  // Returns list of all rawMaterial entries linked to specific productId
  // console.log(materialList)
  return NextResponse.json(materialList);
  // return NextResponse.json(JSON.stringify({ test: `${identifier}` }));
}

export async function POST(request: Request) {
  const req = await request.json();
  const data = req.data;
  const userId = req.userId;
  const linkData = req.link;
  // data should be in format:
  // {materialId: [a, b, c], productId: x}?
  console.log(data);
  // Try to add new link between materialId and productId. Catch the error when it fails
  try {
    // const user = await prisma.users.findFirstOrThrow()
    const userPrisma = prisma.$extends(forUser(userId));
   
    // Loop over array of new materials and add them
    Object.values(linkData).map( async (linkValue) => {
      await userPrisma.materialProductLink.create({
          data: {
             // @ts-ignore 
            materialId: parseInt(linkValue),
            productId: parseInt(data.id),
          },
        });
      })

    // Return redicrect url if everything succeeded
    return NextResponse.redirect(new URL(`/product/${data.id}/rawmaterial`, request.url));
  } catch (e: any) {
    // It failed to update
    console.log("update failed", e);
    return new NextResponse(JSON.stringify("hgelp"), {
      status: 406,
      headers: { "Content-Type": "application/json" },
    });
  }
}
