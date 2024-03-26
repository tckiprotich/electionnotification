// @ts-nocheck
import { NextResponse } from "next/server";
import connectDB from "@/utils/connect.mongo";
var https = require('follow-redirects').https;
var fs = require('fs');
import Contactsmodel from '../../../models/contacts'
import CampaignModel from '../../../models/campain'
import { currentUser, auth } from "@clerk/nextjs";

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
    console.log("Request Body", file);

    // Connect to the database
    await connectDB();
    const user = await currentUser();
    const { FName, LName } = { FName: user.firstName, LName: user.lastName }

    const { name, description, status, recurrence, sendDateTime } = { name: file.campaign, description: file.message, status: file.about, recurrence: file.recurrence, sendDateTime: file.sendDateTime }


    // Create a new campaign
    const campaign = new CampaignModel({ name, description, status, sentBy: `${FName} ${LName}`, recurrence, sendDateTime });
    console.log("abbout to save campaign", campaign)
    await campaign.save();
    console.log("Campaign saved successfully", campaign);

    // get phone number for each user in Contacts
    const contacts = await Contactsmodel.find({});

    // Create an array to store the recipients
    const sentTo = [];

    //for each contact, send a message
    for (const contact of contacts) {
        // console.log(contact.phone);
        sentTo.push(contact.phone); // Add the recipient to the array

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

    // Update the campaign with the recipients
    campaign.sentTo = JSON.stringify(sentTo);
    console.log(campaign, "Final Campaign");
    await campaign.save();

    return NextResponse.json({ message: "New Campaign created", campaign });
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