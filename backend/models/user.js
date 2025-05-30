import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true, 
    },
    email:{
        type: String,
        required: true,
        unique: true,
    }, 
    phoneNumber:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['employee', 'employer'],
        required: true,
    },
    profile:{
        bio: {
            type: String,
            default: '',
        },
        resume: {
            type: String,
            default: '',
        },
        profilePhoto: {
            type: String,
            default: '',
        }
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
}, {timesetamps: true});

const User = mongoose.model('User', userSchema);

export default User;