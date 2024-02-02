import { NextResponse } from "next/server";
import connectDB from "@/utils/connect.mongo";
// @ts-ignore
import CampaignModel from '../../../models/campain'

export async function POST(req: Request, res: NextResponse) {
    // Get the file from the request
    const file = await req.json();
    console.log(file);

    // Connect to the database
    await connectDB();

    // Create a new campaign
    const campaign = new CampaignModel({name:file.campaign , description:file.about, status:file.message});
    console.log(campaign);

    try {
        await campaign.save();
        console.log("Campaign saved successfully");
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error uploading file" });
    }


    return NextResponse.json({ message: "New Campaign created" });

};