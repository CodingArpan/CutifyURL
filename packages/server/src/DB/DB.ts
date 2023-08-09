import mongoose from "mongoose";

const db = async (DbUrl:string):Promise<void> => {
 
    try {
        await mongoose.connect(DbUrl).then((res) => {
            console.log(`DB connection established ++++++++++++++++++++++++++++++++++++++++++++++`)
        })
    } catch (error:any) {
        console.log(error.message,+'/n ...............Golmal hai Fix it....................');

    }
}

export default db;