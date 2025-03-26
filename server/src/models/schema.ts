import { Schema, model, Document, Model  } from "mongoose";


export interface IUser extends Document{
    username:string
    password:string
    email:string
    name?:string
    tokens ?: {token:string} []
}

const userSchema = new Schema<IUser>({
    username : {type :String, required :true,unique:true},
    password : {type :String, required :true},
    email : {type :String, required :true,unique:true},
    name : String,
    tokens : [{token :String}],
})

export const User: Model<IUser> = model<IUser>('User',userSchema);