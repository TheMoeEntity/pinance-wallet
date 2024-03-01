import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@/Helpers/lib/mongodb"
import User from "@/Helpers/models/user";
import { hash, compare } from 'bcryptjs'
import { IUser } from "@/Helpers/interfaces";
import mongoose from "mongoose";
import { signToken } from "@/Helpers/auth";

export async function POST(req: NextRequest, res: NextResponse) {
    await connectToMongoDB().catch(err => req.json())
    const { email, password } = await req.json();
    let resp: { password: string }
    try {
        resp = await User.findOne({
            email: email
        }).select("+password").then(async (res) => {

            return res
        }).catch(err => {
            return err
        })
        console.log(resp.password)
        const isPswCorrect = await compare(password, resp.password);
        if (!isPswCorrect) {
            Promise.reject("Invalid  Password")
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
        }

        return NextResponse.json({ data: resp }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to log in user: " + error }, { status: 500 });
    }


}