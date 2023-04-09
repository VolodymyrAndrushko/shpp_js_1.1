import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
    text: string;
    checked: boolean;
}

const Item: Schema = new mongoose.Schema({
    text: { type: "string", require: true },
    checked: { type: "boolean", require: true }
})

export default mongoose.model<IItem>("Item", Item);