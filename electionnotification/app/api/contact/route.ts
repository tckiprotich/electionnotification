// @ts-nocheck
import { NextResponse } from "next/server";
import connectDB from "@/utils/connect.mongo";
import ContactModel from '../../../models/contacts'


export async function GET(req: Request, res: NextResponse) {

    // Connect to the database
    await connectDB();

    // Find documents where the phoneNumber exists in the sentTo array
    const campaigns = await ContactModel.find({ phone: "+254796250508" });
    console.log(campaigns);

    return NextResponse.json({
        campaigns,
        message: 'Campaign retrieved successfully'
    });
}