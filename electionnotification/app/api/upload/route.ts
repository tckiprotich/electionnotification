// @ts-nocheck
import { NextResponse } from "next/server";
import connectDB from "@/utils/connect.mongo";
import ContactModel from '../../../models/contacts'

interface IContact extends Document {
    name: string,
    email: string,
    phone: string
}


export async function POST(req: Request, res: NextResponse) {
    // Get the file from the request
    const file = await req.json();

    // Connect to the database
    await connectDB();

    // Create a new contact
    for (const record of file) {
        // Check if phone number already exists
        const existingContact = await ContactModel.findOne({ phone: record.phone });
        if (existingContact) {
            console.log(`Phone number ${record.phone} already exists`);
            continue; // Skip this iteration and move on to the next record
        }

        // @ts-ignore
        const contact = new ContactModel(record);
        console.log(contact);

        try {
            await contact.save();
            console.log("Contact saved successfully");
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Error uploading file" });
        }
    }
    return NextResponse.json({ message: "File uploaded successfully" });
};