// @ts-nocheck
import { NextResponse } from "next/server";
import connectDB from "@/utils/connect.mongo";
import Contactsmodel from '../../../models/contacts'

export async function POST(req: Request, res: NextResponse) {
    try {
        // Get the data from the request
        const data = await req.json();
        console.log(data);
        await connectDB();
        const contact = new Contactsmodel(data);
        await contact.save();
        console.log('Contact added successfully');
        return NextResponse.json({ message: "Contact added successfully" });
    } catch (error) {
        console.error('Error:', error);
        console.log('An error occurred while adding the contact');
        return NextResponse.json({ message: "An error occurred while adding the contact" });
    }
}

export async function GET(req: Request, res: NextResponse) {
    try {
        await connectDB();
        const contacts = await Contactsmodel.find();
        console.log('Contacts:', contacts);
        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Error:', error);
        console.log('An error occurred while fetching the contacts');
        return NextResponse.json({ message: "An error occurred while fetching the contacts" });
    }
}