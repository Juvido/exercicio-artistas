import mongoose from "mongoose";

export async function connectToDB (){
    try {
        const dbConnection = await mongoose.connect("mongodb://127.0.0.1:27017/albuns");
        
        console.log(`Conectado ao ${dbConnection.connection.name}`)

    } catch(e) {
        console.log(e)
    }
}
