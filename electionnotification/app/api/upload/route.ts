import { NextResponse } from "next/server";
import connectDB from "@/utils/connect.mongo";
// @ts-ignore
import ContactModel from '../../../models/contacts'

interface IContact extends Document {
    name: string,
    email: string,
    phone: string
}


export async function POST(req: Request, res: NextResponse) {
    // Get the file from the request
    const file = await req.json();
    console.log(file);

    // Connect to the database
    await connectDB();

    // Create a new contact
    for (const record of file) {
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