import { NextResponse } from "next/server";
import connectDB from "@/utils/connect.mongo";
var https = require('follow-redirects').https;
var fs = require('fs');
// @ts-ignore
import CampaignModel from '../../../models/campain'



export async function POST(req: Request, res: NextResponse) {
    // Get the file from the request
    const file = await req.json();
    console.log(file);


    // infobip
    var options = {
        'method': 'POST',
        'hostname': 'j3d28v.api.infobip.com',
        'path': '/sms/2/text/advanced',
        'headers': {
            'Authorization': `App ${process.env.API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        'maxRedirects': 20
    };

    var req: Request = https.request(options, function (res: Response) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    var postData = JSON.stringify({
        "messages": [
            {
                "destinations": [{ "to": "254796250508" }],
                "from": "ServiceSMS",
                "text": file.message,
            }
        ]
    });

    req.write(postData);

    req.end();

    return NextResponse.json({ message: "New Campaign created" });
}