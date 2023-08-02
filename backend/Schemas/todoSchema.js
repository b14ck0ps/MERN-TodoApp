import { Schema } from "mongoose";

const todoSchema = new Schema({
    task: String,
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.new
    },
    status: {
        type: Boolean,
        default: false
    }
});

export default todoSchema
