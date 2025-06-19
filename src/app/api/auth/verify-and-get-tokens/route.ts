import { NextResponse } from 'next/server';
import axios from 'axios';
import { auth } from '@/auth';
import extractUserInfoFromEmail from '@/utils/authUtils';

export async function POST(request: Request) {
  console.log("verify-and-get-tokens: POST request received");

  const session = await auth();

  if (!session?.user?.email) {
    console.log("verify-and-get-tokens: No session found");
    return NextResponse.json({ error: 'No session found' }, { status: 401 });
  }

  if (!session.idToken || !session.accessToken) {
    console.log("verify-and-get-tokens: Missing Google OAuth tokens in session");
    return NextResponse.json({ error: 'Missing Google OAuth tokens in session' }, { status: 401 });
  }

  const userInfo = extractUserInfoFromEmail(session.user.email);
  if (!userInfo) {
    console.log("verify-and-get-tokens: Invalid NITC email format");
    return NextResponse.json({ error: 'Invalid NITC email format' }, { status: 400 });
  }

  const payload = {
    id_token: session.idToken,
    access_token: session.accessToken,
    email: session.user.email,
    name: session.user.name,
    roll_number: userInfo.rollNumber,
    department: userInfo.department,
    programme: userInfo.programme,
  };

  if (process.env.NODE_ENV === "development") {
    console.log("verify-and-get-tokens: Payload to Django:", payload);
  }

  const djangoURL = process.env.DJANGO_BACKEND_URL;

  if (!djangoURL) {
    return NextResponse.json({ error: 'Django backend URL not configured' }, { status: 500 });
  }

  try {
    const response = await axios.post(
      `${djangoURL}/api/user/google-oauth`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (process.env.NODE_ENV === "development") {
      console.log("verify-and-get-tokens: Django response:\n", response.data);
    }

    return NextResponse.json({
      success: true,
      tokens: response.data.tokens,
      user: response.data.user,
    });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: error.message };

    console.error("verify-and-get-tokens: Django error:", data);

    return NextResponse.json({ error: data }, { status });
  }
}
