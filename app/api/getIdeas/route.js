import { NextResponse } from "next/server"
import { database, storage } from "@/appwriteConf";
import { ID } from "appwrite";

export async function GET(req) {

    const response  = await database.listRows({
        databaseId: `${process.env.DATABASE_ID}`,
        tableId: `products`
    }
    )

    return NextResponse.json({response})
}