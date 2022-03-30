import mongoose, { Schema } from 'mongoose';

const DataSchema = new Schema({
    // this is important
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    // change somethingA to proper name
    keyValue: {
        type: String,
    },
    // change somethingB to proper name
    tokenID: {
        type: String,
    },
    // change somethingC to proper name
    ipfsLink: {
        type: String,
    }
});

mongoose.models = {};

export default mongoose.model('Data', DataSchema);