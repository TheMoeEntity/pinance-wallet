import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@/Helpers/lib/mongodb"
import User from "@/Helpers/models/user";
import { hash } from 'bcryptjs'
import { IUser } from "@/Helpers/interfaces";
import mongoose from "mongoose";
import { signToken } from "@/Helpers/auth";

export async function POST(req: NextRequest, res: NextResponse) {
    await connectToMongoDB().catch(err => req.json())
    const { fullName, email, password } = await req.json();
    var jwt;

    const userExists = await User.findOne({ email })
    if (userExists) {
        return NextResponse.json({ error: "User already exists" }, { status: 409 });
    } else {
        if (password.length < 4) {
            return NextResponse.json({ error: "Password too short" }, { status: 409 });
        }
        const harshed = await hash(password, 12);
        try {
            jwt = await User.create({
                name: fullName,
                email,
                password: harshed
            }).then(res => {
                const user = {
                    _id: res._id,
                    fullName: res.name,
                    email: res.email
                }
                const token = signToken(user);
                const newUser = { ...user, token }
                jwt = newUser
                console.log("success", jwt)
                return newUser
            })
                .catch(err => {
                    console.log(err)
                    return NextResponse.json({ error: "Failed to create user: " + err }, { status: 500 });
                })
            return NextResponse.json({ success: true, data: jwt }, { status: 201 });
        } catch (error) {
            console.log(error)
            return NextResponse.json({ error: "Failed to create user: " + error }, { status: 500 });
        }


    }
} 