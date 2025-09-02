import { NextResponse } from "next/server"
import { database } from "@/appwriteConf"
import { ID, Query } from "appwrite"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const productId = searchParams.get("id")
    const email = searchParams.get("email")

    const existingUpvote = await database.listRows({
        databaseId: process.env.DATABASE_ID,
        tableId: "upvotes",
        queries: [
            Query.equal("product_id", [productId]),
            Query.equal("email", [email]),
        ],
    })

    const product = await database.getRow({
        databaseId: process.env.DATABASE_ID,
        tableId: "products",
        rowId: productId,
    })

    const upvotes = product.upvotes

    if (existingUpvote.rows.length > 0) {
        await database.deleteRow({
            databaseId: process.env.DATABASE_ID,
            tableId: "upvotes",
            rowId: existingUpvote.rows[0].$id,
        })
        
        await database.updateRow({
            databaseId: process.env.DATABASE_ID,
            tableId: "products",
            rowId: productId,
            data: { upvotes: upvotes - 1 },
        })
        return NextResponse.json({ liked: false, upvotes: upvotes - 1 })
    } else {
        await database.createRow({
            databaseId: process.env.DATABASE_ID,
            tableId: "upvotes",
            rowId: ID.unique(),
            data: { product_id: productId, email },
        })

        await database.updateRow({
            databaseId: process.env.DATABASE_ID,
            tableId: "products",
            rowId: productId,
            data: { upvotes: upvotes + 1 },
        })
        return NextResponse.json({ liked: true, upvotes: upvotes + 1 })
    }
}
