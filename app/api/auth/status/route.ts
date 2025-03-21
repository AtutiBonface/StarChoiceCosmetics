export const dynamic = 'force-static';

import { NextResponse } from "next/server";
import { cookies } from "next/headers";



export async function GET(){
    const token = (await cookies()).get("token")?.value

    return NextResponse.json({isAuthenticated : !!token})
}