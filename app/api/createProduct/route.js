import { NextResponse } from "next/server"
import { database, storage } from "@/appwriteConf";
import { ID } from "appwrite";

export async function POST(req) {
   const formData = await req.formData()
    const title = formData.get("title")
    const content = formData.get("content")
    const file = formData.get("logo")
    const email = formData.get("email")
    const name = formData.get("name")


    const uploaded = await storage.createFile(
        'logos',
        ID.unique(),
        file
    )
        const url = `https://syd.cloud.appwrite.io/v1/storage/buckets/logos/files/${uploaded.$id}/view?project=product`

   const res = await database.createRow({
        databaseId: process.env.DATABASE_ID,
        tableId: 'products',
        rowId: ID.unique(),
        data: {
            title: title,
            content: content,
            logo: url,
            email: email,
            name: name
        }
    })

    return NextResponse.json({success: true})
}