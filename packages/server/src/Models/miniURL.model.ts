import mongoose, { Document } from "mongoose";



export interface Shorturl_temp extends Document {
  destination: string;
  custom: boolean;
  keyword: string;
  secure: boolean;
  password: string;
  login: boolean;
  userid: string;
  track: boolean;
  title?: string;
  tags?: string[];
}

const schema = new mongoose.Schema({

  destination: {
    type: String,
    required: true,
    trim: true,
    minLength: [13, 'URL must be atleast 13 characters long']

  },
  custom: {
    required: true,
    type: Boolean,
    trim: true,
    enum: { values: ['true', 'false'] }
  },
  keyword: {
    required: true,
    type: String,
    trim: true,
    unique: true,
    minLength: [4, 'keyword must be atleast 4 characters long']
  },
  secure: {
    required: true,
    type: Boolean,
    trim: true,
    enum: { values: ['true', 'false'] }
  },
  password: {

    type: String,
    trim: true,
    minLength: [6, 'password must be atleast 6 characters long and contains only alphabets and numbers'],

  },
  login: {
    required: true,
    type: Boolean,
    trim: true,
    enum: { values: ['true', 'false'] }
  },
  userid: {
    type: String,
    trim: true,
    minLength: [4, 'user id must be atleast 4 characters long and contains only alphabets and numbers'],
    default: '0000'
  },
  track: {
    required: true,
    type: Boolean,
    trim: true,
    enum: { values: ['true', 'false'] }

  },
  title: {
    type: String,
    trim: true,
    minLength: [4, 'keyword must be atleast 4 characters long'],
    default: "null"
  },
  tags: {
    type: [String],
  },
  clicks: {
    type: Number,
    default: 0

  },
  country: {
    type: [String],

  }


}, { timestamps: true });

const shortUrl = mongoose.model<Shorturl_temp>("shorturl", schema);

export default shortUrl;
