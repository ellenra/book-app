import { NextRequest, NextResponse } from "next/server"
import { db } from '@/app/lib/db'

export async function handler(req: Request, res: Response) {
  try {
    if (req.method === 'GET') {
      await handleGet(req, res)
    } else if (req.method === 'POST') {
      await handlePost(req, res)
    } else {
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405})
    }
  } catch (error) {
    console.error('Error in API', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function handleGet(req: Request, res: Response) {
  try {
    const books = await db.book.findMany()
    return NextResponse.json({ books: books }, { status: 200 })
  } catch (error) {
    console.error('Error in handleGet', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}


export async function handlePost(req: Request, res: Response) {
  try {
      const { title, author, state, end_date, rating, comment, email } = await req.json()
      console.log(req.body)
      const user = await db.user.findUnique({
        where: {
          email: email
        }
      })
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
      const newBook = await db.book.create({
        data: {
          title: title,
          author: author,
          state: state,
          end_date: end_date,
          rating: rating,
          comment: comment,
          userId: user.id,
        },
      })
      console.log(newBook)
      return NextResponse.json({ book: newBook, message: 'Added book' }, { status: 201 })

  } catch (error) {
    console.error('Error adding book:', error)
    return NextResponse.json({ message: 'Error adding book' }, { status: 500 })
  }
}

export { handlePost as POST, handleGet as GET}
