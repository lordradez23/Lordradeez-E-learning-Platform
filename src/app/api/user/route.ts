import { getUserFromToken } from "@/lib/JWT";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(user);
}
