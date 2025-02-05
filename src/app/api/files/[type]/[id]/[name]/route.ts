import { NextRequest, NextResponse } from "next/server";
import { getFiles } from "@/lib/queries/queries";
import { QueryFileProps } from "@/types/globals";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; name: string; type: QueryFileProps['type'] } }
) {
  const { id, name, type } = params;

  const data = await getFiles({ id, name, type });

  if (!data) {
    return new NextResponse("Archivo no encontrado", { status: 404 });
  }

  const contentType = data.ContentType || "image/jpeg";
  const base64String = data[type];

  if (!base64String) {
    return new NextResponse("Imagen no disponible", { status: 404 });
  }

  const fileBuffer = Buffer.from(base64String, "base64");

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: { "Content-Type": contentType },
  });
}
