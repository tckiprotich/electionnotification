import mongoose from "mongoose";
import { Schema } from "mongoose";


const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
});

const Contacts = mongoose.model("MyBooks", contactSchema);
export default Contacts;