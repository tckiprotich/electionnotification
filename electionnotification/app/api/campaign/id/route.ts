// @ts-nocheck
import { NextResponse } from "next/server";
import connectDB from "@/utils/connect.mongo";
import CampaignModel from '../../../../models/campain'
import ContactModel from '../../../../models/contacts' // Import the ContactModel

export async function GET(req: Request, res: NextResponse) {
    const id = req.nextUrl.searchParams.get('id') as string;
    console.log('Get by id:', id);
    // Connect to the database
    await connectDB();

    // Get the campaign
    const campaign = await CampaignModel.findOne({ _id: id });
    // Parse sentTo into an array
    const sentToArray = JSON.parse(campaign.sentTo);
    console.log('Sent to:', sentToArray);

    // Get the contact details for each phone number
    const contacts = await Promise.all(sentToArray.map(phoneNumber => ContactModel.find({ phone:phoneNumber  })));

    return NextResponse.json({
        campaign,
        contacts,
        message: 'Campaign and contacts retrieved successfully'
    });
}