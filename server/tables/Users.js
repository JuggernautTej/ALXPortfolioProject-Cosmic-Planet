import mongoose from 'mongoose';

const Schema= mongoose.Schema;
const UsersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model('User', UsersSchema);