import { Schema } from 'mongoose'
import mongoose from 'mongoose'


const campainSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: false },
    sentBy: { type: String, required: true },
    sentTo: { type: String, required: false },
    recurrence: { type: String, required: false },
    sendDateTime: { type: Date, required: false },
    date: { type: Date, default: Date.now } // Provide Date.now as a reference to the function
});
let Campains;

if (mongoose.models.Campains) {
    Campains = mongoose.model('Campains');
}
else {
    Campains = mongoose.model('Campains', campainSchema);
}

export default Campains;







