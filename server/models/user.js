import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    name: { type: String, require: true},
    email: { type: String , required: true },
    password: { type: String, required: true},
    id: { type: String, requried: true }
})

const user = mongoose.model('User', userSchema);

export default user;