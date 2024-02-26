import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/app/lib/db'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      await handlePost(req, res)
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Error in API', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
      const { title, author, state, end_date, rating, comment } = req.body
      console.log(req.body)
      const newBook = await db.book.create({
        data: {
          title: title,
          author: author,
          state: state,
          end_date: end_date,
          rating: rating,
          comment: comment,
          userId: req.body.id,
        },
      })
      console.log(newBook)
      res.status(201).json({ book: newBook, message: 'Added book' })

  } catch (error) {
    console.error('Error adding book:', error)
    res.status(500).json({ message: 'Error adding book' })
  }
}

export { handlePost as POST}
