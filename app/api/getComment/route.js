import { NextResponse } from "next/server"
import { database } from "@/appwriteConf";
import { Query } from "appwrite";
import { ID } from "appwrite";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const res = await database.listRows(
        {
            databaseId: process.env.DATABASE_ID,
            tableId: `comment`,
            queries: [
                Query.equal('productId', [productId])
            ]
        }
    )

    return NextResponse.json(res.rows)

}