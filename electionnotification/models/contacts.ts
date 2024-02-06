import mongoose from "mongoose";
import { Schema } from "mongoose";

interface IContact extends Document {
    name: string,
    email: string,
    phone: string
}


const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
});

let Contacts;

if (mongoose.models.Contacts) {
    Contacts = mongoose.model('Contacts');
}
else {
    Contacts = mongoose.model('Contacts', contactSchema);
}
export default Contacts;