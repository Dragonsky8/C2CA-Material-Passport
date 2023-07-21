import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// Fetch one specific entity info
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const identifier = params.id; // 'a', 'b', or 'c'
  // console.log(identifier);
  const res = await prisma.material.findFirst({
    where: { id: parseInt(identifier) },
  });
  // console.log(res)
  return NextResponse.json(res);
  // return NextResponse.json(JSON.stringify({ test: `${identifier}` }));
}

// Create a new entity
export async function POST(request: Request) {
  const data = await request.json();
  // Add production date
  data.dateOfProduction = new Date();
  // Try to add new entity. Catch the error when it fails
  try {
    const res = await prisma.material.create({
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
  const data = await request.json();
  const dbId = parseInt(data.id);
  // Try to add new entity. Catch the error when it fails
  try {
    const res = await prisma.material.update({
      where: { id: dbId + 1 },
      data: { name: "hank" },
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
