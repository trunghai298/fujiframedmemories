import { auth2Client } from "@/app/contants/auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const url = auth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/drive",
      ],
    });
    return NextResponse.redirect(url);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};
