import { NextResponse } from "next/server"
import { hash } from 'bcrypt'
import { db } from "../../../lib/db"
import { use } from "react"

export async function POST(request: Request) {
    try {
        const {username, email, password} = await request.json()
        const emailInUse = await db.user.findUnique({
            where: {email: email}
        })
        if (emailInUse) {
            return NextResponse.json({ user: null, message: "Email is already in use" }, { status: 409 })
        }
        const usernameInUse = await db.user.findUnique({
            where: {username: username}
        })
        if (usernameInUse) {
            return NextResponse.json({ user: null, message: "Username is already in use" }, { status: 409 })
        }
   
        const hashedPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        })
        const { password: newUserPassword, ...rest } = newUser
        return NextResponse.json({ user: rest, message: "Successfully created user" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Error in registration" }, { status: 500 })
    }
}