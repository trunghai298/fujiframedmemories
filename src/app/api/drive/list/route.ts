import { auth2Client } from "@/app/contants/auth";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const url = new URL(req.url);
    const tokens = url.searchParams.get("tokens");
    const limit = url.searchParams.get("limit");
    const offset = url.searchParams.get("offset");

    if (tokens) {
      auth2Client.setCredentials(JSON.parse(tokens));
    }
    const drive = google.drive({ version: "v3", auth: auth2Client });
    const driveRes = await drive.files.list({
      fields:
        "nextPageToken, files(id, name, webViewLink, webContentLink, thumbnailLink, modifiedTime, parents, imageMediaMetadata, owners)",
      pageSize: limit ? parseInt(limit) : 100,
      orderBy: "modifiedTime desc",
      q: "'me' in writers and trashed = false and mimeType != 'application/vnd.google-apps.folder' and '1-1XJYDUZo96oUEiZTqQ7XlyDAfrxyH9w' in parents",
    });
    if (driveRes.data) {
      const files = driveRes.data.files?.map((file) => {
        const imgLink =
          file.webContentLink?.split("?")[0] +
          "?export=view" +
          "&" +
          file.webContentLink?.split("?")[1].split("&")[0];
        return { ...file, imgLink };
      });
      return NextResponse.json({ message: "OK", files }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};
