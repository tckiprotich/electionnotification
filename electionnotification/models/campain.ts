import { Schema } from 'mongoose'
import mongoose from 'mongoose'


const campainSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: false }
});

let Campains;

if (mongoose.models.Campains) {
    Campains = mongoose.model('Campains');
}
else {
    Campains = mongoose.model('Campains', campainSchema);
}

export default Campains;







