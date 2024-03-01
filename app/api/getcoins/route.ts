import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@/Helpers/lib/mongodb"
import User from "@/Helpers/models/user";


export async function POST(req: NextRequest, res: NextResponse) {
    await connectToMongoDB().catch(err => req.json())
    const { _id } = await req.json();
    let resp: { password: string }
    try {
        resp = await User.findOne({
            _id: _id
        }).then(async (res) => {
            return res.coins
        }).catch(err => {
            return err
        })
        return NextResponse.json({ data: resp }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to get coins: " + error }, { status: 500 });
    }


}