import { auth2Client } from "@/app/contants/auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    if (code) {
      const { tokens } = await auth2Client.getToken(code);
      auth2Client.setCredentials(tokens);
      return NextResponse.redirect(
        `https://fujiframedmemories.vercel.app/gallery?tokens=${JSON.stringify(
          tokens
        )}`
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};
