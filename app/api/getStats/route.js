import { NextResponse } from "next/server"
import { database, storage } from "@/appwriteConf";
import { ID, Query } from "appwrite";

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")
    var upvotes = 0;
    const res = await database.listRows(
        {
            databaseId: process.env.DATABASE_ID,
            tableId: `products`,
            queries: [
                Query.equal('email', [email])
            ]
        }
    )

    console.log(res)
    for (let i = 0; i < res.rows.length; i++) {
        upvotes = upvotes + res.rows[i].upvotes
    }
    console.log(upvotes)
    console.log(res.rows.length)

   return NextResponse.json({upvotes: upvotes, totalProducts: res.rows.length})
}