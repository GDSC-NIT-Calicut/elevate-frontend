// src/app/api/auth/verify-and-get-tokens/route.ts
import { NextResponse } from 'next/server';
import { extractUserInfoFromEmail } from '@/utils/authUtils';
import axios from 'axios';
// import { auth } from '@/auth';
import { auth } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  console.log("verify-and-get-tokens: POST request received");

  const session = await auth();
  console.log("verify-and-get-tokens: Session:\n", session);

  if (!session?.user?.email) {
    console.log("verify-and-get-tokens: No session found");
    return NextResponse.json({ error: 'No session found' }, { status: 401 });
  }

  const userInfo = extractUserInfoFromEmail(session.user.email);
  if (!userInfo) {
    console.log("verify-and-get-tokens: Invalid NITC email format");
    return NextResponse.json({ error: 'Invalid NITC email format' }, { status: 400 });
  }

  const payload = {
    id_token: session.idToken,
    email: session.user.email,
    name: session.user.name,
    roll_number: userInfo.rollNumber,
    department: userInfo.department,
    programme: userInfo.programme,
    // provider: session.provider,
    // access_token: session.accessToken,
    
  };

  console.log("verify-and-get-tokens: Payload to Django:", payload);

  try {
    const response = await axios.post(
      `${process.env.DJANGO_BACKEND_URL}/api/user/google-oauth/`,
      payload
    );

    console.log("verify-and-get-tokens: Django response:\n", response.data);

    return NextResponse.json({
      success: true,
      tokens: response.data.tokens,
      user: response.data.user,
    });
  } catch (error: any) {
    console.error("verify-and-get-tokens: Django error:", error.response?.data || error.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
