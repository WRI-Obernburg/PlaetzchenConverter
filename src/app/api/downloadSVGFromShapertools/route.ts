import {NextRequest} from "next/server";
import AuthShaperTools from "@/app/api/AuthShaperTools";

export async function GET(request: NextRequest) {

    const user = request.nextUrl.searchParams.get('user') ?? '';
    const pw = request.nextUrl.searchParams.get('pw') ?? '';
   const jwt = await AuthShaperTools(user, pw);

    const blobKey = request.nextUrl.searchParams.get('blobKey') ?? '';

   const data = await fetch("https://api.shapertools.com/blobs/"+blobKey, {
        method: "GET",
        headers: {
            "Accept": "application/x-url",
            "Accept-Language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
            "Authorization": "Bearer "+jwt,
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Origin": "https://hub.shapertools.com",
            "Pragma": "no-cache",
            "Referer": "https://hub.shapertools.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "X-ApiVersion": "3.0.0",
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        },
        redirect: "follow"
    })
        .then((response) => response.text())


    return new Response(JSON.stringify({
        downloadURL: data
    }));



}