import { NextResponse } from "next/server"
import { database } from "@/appwriteConf"
import { ID, Query } from "appwrite"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const param = searchParams.get("param")

    const res = await database.listRows(
        {
            databaseId: process.env.DATABASE_ID,
            tableId: `products`,
            queries: [
                Query.equal('title', [param])
            ]
        }
    )

    console.log(res)
    return NextResponse.json(res)
}