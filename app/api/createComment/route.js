import { NextResponse } from "next/server"
import { database } from "@/appwriteConf";
import { Query } from "appwrite";
import { ID } from "appwrite";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const comment = searchParams.get("comment");
    const name = searchParams.get("name");
    const productId = searchParams.get("productId");

    const res = await database.createRow(
        {
            databaseId: process.env.DATABASE_ID,
            tableId: 'comment',
            rowId: ID.unique(),
            data: {
                comment: comment,
                name: name,
                productId: productId
            }
        }
    )

    return NextResponse.json({succes: true})
}
