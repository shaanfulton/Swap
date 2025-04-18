import { NextResponse } from "next/server";
import { tokens } from "@/lib/tokens";

export async function GET() {
  // Add a small delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json({ tokens });
}
