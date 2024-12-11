export default async function AuthShaperTools(user: string, pw: string) {
    const data = await fetch("https://auth.shapertools.com/token", {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "Accept-Language": "de-DE,de;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "Origin": "https://hub.shapertools.com",
            "Pragma": "no-cache",
            "Referer": "https://hub.shapertools.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "X-ApiVersion": "2.0.0",
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        },
        body: JSON.stringify({
            client_id: "000000000000000000000000",
            grant_type: "password",
            username: user,
            password: pw,
            scope: "*",
            acceptTC: false
        }),
        redirect: "follow",
        next: {
            revalidate: 100000
        }
    })
        .then((response) => response.json()).catch(console.error);

    return (data as any);
}