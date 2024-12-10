import { utapi } from '@/app/server/uploadthing';
import { type NextRequest } from 'next/server'


export async function GET(request: NextRequest) {
  // get the URL of the stl file from the request query
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('file') ?? '';
  console.log(query);
  // return the file
  const file = await fetch(query);
  //set custom content-disposition headers for the file
  const headers = new Headers(file.headers);
  headers.set('Content-Disposition', 'attachment; filename="file.stl"');
  headers.set('Content-Type', 'application/octet-stream');

  utapi.deleteFiles([query.split("/").pop()!]);

  return new Response(file.body, {
    headers,
  });
}