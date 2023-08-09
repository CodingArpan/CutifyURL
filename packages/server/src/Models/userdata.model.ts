import mongoose from "mongoose";

export interface userdata_temp extends Document {
    user_screen: {
        height: number;
        width: number;
        colorDepth: number;
        pixelDepth: number;
        orientation: {
            angle: number;
            type: 'landscape-primary' | "landscape-secondary" | "portrait-secondary" | "portrait-primary";
        };
    };
    user_device: {
        os: string | null;
        platform: string;
        mobile: boolean;
        gpu_info: string;
        cpu_threads: number;
        maxTouchPoints: number;
    };
    user_browser: {
        browser: {
            brand: string;
            version: string;
        } | null;
        language: string[];
        user_agent: string;
        appVersion: string;
    };
    user_info: {
        country: string;
        countryCode: string;
        region: string;
        regionName: string;
        city: string;
        zip: string;
        timezone: string;
        isp: string;
        org: string;
        as: string;
        query: string;
    };
    pathid: string;
    refid: string;
}

const dataSchema = new mongoose.Schema({
    user_screen: {
        height: {
            type: Number,

        },
        width: {
            type: Number,

        },
        colorDepth: {
            type: Number,

        },
        pixelDepth: {
            type: Number,

        },
        orientation: {
            angle: {
                type: Number,
            },
            type: {
                type: String,
                enum: { values: ['landscape-primary', "landscape-secondary", "portrait-secondary", "portrait-primary"] },
            },
        }
    },
    user_device: {
        os: {
            type: String,
            // default: null,
        },
        platform: {
            type: String,
        },
        mobile: {
            type: Boolean,
        },
        gpu_info: {
            type: String,
        },
        cpu_threads: {
            type: Number,
        },
        maxTouchPoints: {
            type: Number,
        },
    },
    user_browser: {
        browser: {
            brand: {
                type: String,
            },
            version: {
                type: String,
            },
            // default: null,
        },
        language: [String],
        user_agent: {
            type: String,
        },
        appVersion: {
            type: String,
        },
    },
    user_info: {
        country: {
            type: String,
        },
        countryCode: {
            type: String,
        },
        region: {
            type: String,
        },
        regionName: {
            type: String,
        },
        city: {
            type: String,
        },
        zip: {
            type: String,
        },
        timezone: {
            type: String,
        },
        isp: {
            type: String,
        },
        org: {
            type: String,
        },
        as: {
            type: String,
        },
        query: {
            type: String,
        },
    },
    pathid: {
        type: String,
    },
    refid: {
        type: String,
    },


}, { timestamps: true })

const userData = mongoose.model<userdata_temp>("userData", dataSchema);

export default userData;