import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Ping the database by counting accounts or just selecting 1
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({ 
      status: "success", 
      message: "pong",
      timestamp: new Date().toISOString()
    }, { status: 200 });
  } catch (error) {
    console.error("Cron Ping Error:", error);
    return NextResponse.json({ 
      status: "error", 
      message: "Failed to ping database" 
    }, { status: 500 });
  }
}
