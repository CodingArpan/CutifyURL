
import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface createprofile_temp extends Document {
    fullname:string;
    email:string;
    mobile?:string;
    confirmpwd:string;
}

const createprofile = new Schema({

    fullname: {
        type: String,
        lowercase: true,
        required: true,
        minLength: [5, 'Name Must Be Atleast 5 characters Long'],
        maxLength: [100, 'Name Must Be Within 100 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minLength: [5, 'Email Must Be Atleast 5 characters Long'],
        maxLength: [100, 'Email Must Be Within 100 characters'],
        lowercase: true,
        trim: true,
        unique: true,
    },
    mobile: {
        type: String,
        minLength: [10, 'Mobile Number Must Be 10 Digit Long'],
        maxLength: [10, 'Mobile Number Must Be 10 Digit Long'],

    },
    confirmpwd: {
        type: String,
        required: true,
        trim: true,
    },

}, { timestamps: true })

const userprofile = mongoose.model<createprofile_temp>('userprofile', createprofile);
export default userprofile;
