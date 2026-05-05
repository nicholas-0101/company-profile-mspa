import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const MAX_RETRIES = 3;
  let delay = 5000; // 5 seconds initial delay between retries

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      // Attempt to ping the database
      // Using a timeout in the query itself if possible, or just letting Prisma try
      await prisma.$queryRaw`SELECT 1`;
      
      return NextResponse.json({ 
        status: "success", 
        message: "pong",
        attempts: i + 1,
        timestamp: new Date().toISOString()
      }, { status: 200 });

    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      
      // If it's the last attempt, don't wait, just throw
      if (i === MAX_RETRIES - 1) break;

      // Wait before retrying to give Supabase time to "wake up"
      await new Promise(resolve => setTimeout(resolve, delay));
      delay += 5000; // Increase delay for next attempt
    }
  }

  return NextResponse.json({ 
    status: "error", 
    message: "Failed to wake up database after multiple attempts. Please check if Supabase project is active." 
  }, { status: 500 });
}
