'use client'

import { useState } from "react"
import { Book, State } from "../types/types"

interface Props {
    books: Book[]
}

export default function BookList({ books }: Props) {
    const [filter, setFilter] = useState("READING")

    const filteredBooks = books.filter(book => book.state === filter)

    const handleFiltering = (state: State) => {
        setFilter(state)
    }

    return (
        <div>
            <div className="flex justify-center mb-5">
                <button className={`mx-2 px-4 py-2 rounded ${filter === "READING" ? "bg-pink-300 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => handleFiltering("READING")}>Reading</button>
                <button className={`mx-2 px-4 py-2 rounded ${filter === "FINISHED" ? "bg-pink-300 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => handleFiltering("FINISHED")}>Finished</button>
                <button className={`mx-2 px-4 py-2 rounded ${filter === "TO_READ" ? "bg-pink-300 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => handleFiltering("TO_READ")}>To Read</button>
            </div>
            <ul className="grid sm:grid-cols-1 gap-3">
                {filteredBooks.map((book: Book) => (
                    <li key={book.id} className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-lg font-semibold">{book.title}</p>
                        <p className="text-gray-600">{book.author}</p>
                        <p className="text-gray-600">{book.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

