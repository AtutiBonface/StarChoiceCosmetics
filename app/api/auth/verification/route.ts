import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { verificationId, email } = await req.json()

        if (!verificationId || !email) {
            return new Response(
                JSON.stringify({
                    message: "Email and Verification Code are required",
                    success: false,
                    canResend: false,
                    waitTime: 30
                }),
                { status: 400 }
            )
        }

        if (verificationId === "0000" && (email === "admin@gmail.com" || email === "tester@gmail.com")) {
            const cookieOptions = [
                `token=${email}`,
                'Path=/',
                'HttpOnly',
                'Secure',
                'SameSite=Strict',
                `Max-Age=${60 * 60 * 24 * 30}` // 30 days
            ].join('; ');

            return new Response(
                JSON.stringify({ 
                    success: true,
                    canResend: false 
                }), 
                {
                    status: 200,
                    headers: { "Set-Cookie": cookieOptions }
                }
            );
        } else {
            return new Response(
                JSON.stringify({
                    message: "Invalid credentials consider resending the Verification Code!",
                    success: false,
                    canResend: true,
                    waitTime: 30
                }),
                { status: 400 }
            )
        }

    } catch {
        return new Response(
            JSON.stringify({
                message: "Internal Server Error",
                success: false,
                canResend: true,
                waitTime: 30
            }),
            { status: 500 }
        )
    }
}