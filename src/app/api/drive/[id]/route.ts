import { getImages } from "@/app/libs/data";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const images = getImages();
    return NextResponse.json({ message: "OK", data: images });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};
