import { signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Sign out the user
    await signOut({ redirect: false });

    // Set CORS headers
    const headers = {
      "Access-Control-Allow-Origin": req.headers.get("origin") || "*", // Allow the requesting origin
      "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS methods
      "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow necessary headers
      "Access-Control-Allow-Credentials": "true", // Allow credentials
    };

    // Clear the session cookie manually (if needed)
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200, headers }
    );



    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}