import { NextResponse } from "next/server"
import { database } from "@/appwriteConf";
import { Query } from "appwrite";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const email = searchParams.get("email");

    const res = await database.getRow({
        databaseId: process.env.DATABASE_ID,
        tableId: "products",
        rowId: id
    });

    let liked = false;

        const existingUpvote = await database.listRows({
            databaseId: process.env.DATABASE_ID,
            tableId: "upvotes",
            queries: [
                Query.equal("product_id", [id]),
                Query.equal("email", [email]),
            ]
        });
        if (existingUpvote.rows.length > 0) {
            liked = true;
        }
    

    return NextResponse.json({ ...res, liked });
}
