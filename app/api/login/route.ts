import { NextRequest } from 'next/server';

// Define proper interfaces
interface User {
  email: string;
  password: string;
}

interface Users {
  [key: string]: User;
}

// Move users object after imports
const users: Users = {
  admin: { email: "admin@gmail.com", password: "admin" },
  tester: { email: "tester@gmail.com", password: "testpass" },
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Input validation
    if (!email || !password) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Email and password are required" 
        }), 
        { status: 400 }
      );
    }

    // Find user by email
    const user = Object.values(users).find(u => u.email === email);

    if (!user || user.password !== password) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Invalid credentials" 
        }), 
        { status: 401 }
      );
    }

    // Set secure cookie with expiration
    const cookieOptions = [
      `token=${email}`,
      'Path=/',
      'HttpOnly',
      'Secure',
      'SameSite=Strict',
      `Max-Age=${60 * 60 * 24}` // 24 hours
    ].join('; ');

    return new Response(
      JSON.stringify({ success: true }), 
      {
        status: 200,
        headers: { "Set-Cookie": cookieOptions }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Internal server error" 
      }), 
      { status: 500 }
    );
  }
}

