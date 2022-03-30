import mongoose, { Schema } from 'mongoose';

const DataSchema = new Schema({
    // this is important
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    // change somethingA to proper name
    somethingA: {
        type: String,
    },
    // change somethingB to proper name
    somethingB: {
        type: String,
    },
    // change somethingC to proper name
    somethingC: {
        type: String,
    }
});

mongoose.models = {};

export default mongoose.model('Data', DataSchema);