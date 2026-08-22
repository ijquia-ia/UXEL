import { NextResponse } from 'next/server'
export async function POST(request: Request){try{const payload=await request.json();if(!process.env.RESEND_API_KEY) console.log('UXEL contact payload:',payload);return NextResponse.json({ok:true})}catch{return NextResponse.json({ok:false},{status:400})}}
