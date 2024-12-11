import { NextRequest } from "next/server";
import AuthShaperTools from "@/app/api/AuthShaperTools";
import {revalidateTag} from "next/cache";

export async function GET(request: NextRequest) {

    const user = request.nextUrl.searchParams.get('user') ?? '';
    const pw = request.nextUrl.searchParams.get('pw') ?? '';
    const jwt = await AuthShaperTools(user, pw);

       const svgs = await fetch("https://api.shapertools.com/files/userspace/search?limit=50&path=%2F&sort=modified%3A-1&spaceType=userspace", {
            method: "GET",
            headers: {
              "Accept": "*/*",
              "Accept-Language": "de-DE,de;q=0.9",
              "Authorization": "Bearer "+jwt.access_token.token,
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
          });


        if(svgs.status !== 200) {
            revalidateTag("a");
            return GET(request);
        }

        const data = await svgs.text();

       const parsedData = JSON.parse(data!);
       parsedData.jwt = jwt;



      return new Response(JSON.stringify(parsedData), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          "Access-Control-Allow-Credentials": "true"
        }
      });
}