import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
 
export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  // const id = searchParams.get('id')
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const product = await res.json()
  // const credentials = request.body;
  // const res = await prisma.users.findUnique({
  //   where: {
  //     userName: credentials?.username
  //   }
  // })
  return NextResponse.json( JSON.stringify({"test": "cool"}) )
}