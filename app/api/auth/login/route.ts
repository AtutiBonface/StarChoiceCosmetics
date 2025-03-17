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
    // handle sending verification code to users  email 

    
    return new Response(
      JSON.stringify({ success: true , message: "Verification code sent to your email!"}), 
      {
        status: 200,
      }
    );
  } catch{
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Internal server error" 
      }), 
      { status: 500 }
    );
  }
}

