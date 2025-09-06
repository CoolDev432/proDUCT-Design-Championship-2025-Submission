import { NextResponse } from "next/server"
import { database } from "@/appwriteConf";
import { ID } from "appwrite";

export async function POST(req) {
    const body = await req.json()
    const { name, post_content, email } = body;

    const res = database.createRow(
        {
            databaseId: process.env.DATABASE_ID,
            tableId: `forum_posts`,
            rowId: ID.unique(),
            data: {
                name: name,
                post_content: post_content,
                email: email
            }
        }
    )

    return NextResponse.json({success: true})
}