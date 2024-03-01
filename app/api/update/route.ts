import { NextRequest, NextResponse } from "next/server";
import { client, connectToMongoDB } from "@/Helpers/lib/mongodb"
import User from "@/Helpers/models/user";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";


export async function POST(req: NextRequest, res: NextResponse) {
    await connectToMongoDB().catch(err => req.json())
    const { coin, _id } = await req.json();
    const cookieStore = cookies()
    const userInfo = cookieStore.get('userInfo')
    var coins = []
    if (userInfo) {
        const info = JSON.parse(userInfo.value)
        const currCoins = info.data.coins ?? []
        coins = currCoins
    }
    var resp
    try {
        const filter = { _id }
        const options = { upsert: true };
        const updateDoc = {
            $set: {
                coins: `${[...coins, coin]}`
            },
        };
        resp = await User.updateOne(filter, updateDoc, options).then(response => {
            console.log(response)
            return response
        })
        revalidatePath('/dashboard')
        return NextResponse.json({ data: resp }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to update user " + error }, { status: 400 });
    } finally {
        await client.close();
    }
}