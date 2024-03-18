'use client'

import Form from "./form"
import BookList from "./list"

const getBooks = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/book', { cache: 'no-store' })
        const books = await response.json()

        if (!response.ok) {
            throw new Error("Something went wrong")
        }
        console.log(books)

        return books
    } catch (error) {
        console.error('Error fetching books:', error)
        return []
    }
}

export default async function ProfilePage() {
    const { books } = await getBooks()
    console.log("Books:", books)

    return (
        <div className="container mx-auto py-8">
            <Form />
            <br />
            <h2 className="text-3xl mb-5 text-center">Books</h2>
            <BookList books={books} />
        </div>
    )
}
