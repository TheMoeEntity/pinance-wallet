import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "An Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [100, "Name cannot be more than 100 characters long"],
        minLength: [4, "Name must be at least 4 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    bonus: {
        type: Number,
        default: 50
    },
    coins: {
        type: Array,

    }
})

const User = models.User || model("User", UserSchema)
export default User