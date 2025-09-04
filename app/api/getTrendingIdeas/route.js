import { NextResponse } from "next/server"
import { database } from "@/appwriteConf";
import { Query } from "appwrite";

export async function GET(req) {
    const res = await database.listRows({
        databaseId: process.env.DATABASE_ID,
        tableId: `products`,
        queries: [
            Query.orderDesc("upvotes"),
            Query.limit(5)
        ]
    })

    return NextResponse.json(res)
}