// @ts-nocheck
import { NextResponse } from "next/server";
import connectDB from "@/utils/connect.mongo";
var https = require('follow-redirects').https;
var fs = require('fs');
import Contactsmodel from '../../../models/contacts'
import CampaignModel from '../../../models/campain'



/**
 * Handles the POST request for creating a new campaign.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response indicating the success of the operation.
 */
export async function POST(req: Request, res: NextResponse) {
    // Get the file from the request
    const file = await req.json();
    console.log(file);

    // Connect to the database
    await connectDB();

    const { name, description, status } = { name: file.campaign, description: file.message, status: file.about }
    console.log(name, description, status);

    // Create a new campaign
    const campaign = new CampaignModel({ name, description, status });
    await campaign.save();
    console.log("Campaign saved successfully");




    // get phone number for each user in Contacts
    const contacts = await Contactsmodel.find({});

    //for each contact, send a message
    for (const contact of contacts) {
        console.log(contact.phone);
        var postData = JSON.stringify({
            "messages": [
                {
                    "destinations": [{ "to": contact.phone }],
                    "from": "ServiceSMS",
                    "text": file.message,
                }
            ]
        });
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

        req.write(postData);

        req.end();
    }
    req.write(postData);

    req.end();

    return NextResponse.json({ message: "New Campaign created" });
}



export async function GET(req: Request, res: NextResponse) {
    // Connect to the database
    await connectDB();

    // Get all the campaigns
    const campaigns = await CampaignModel.find({});

    return NextResponse.json({
        campaigns,
        message: 'Campaigns retrieved successfully'
    });
}