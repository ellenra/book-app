'use client'

import { FormEvent, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { NewBookData } from "../types/types"

interface BookFormProps {
    onSubmit: (data: NewBookData) => void
}

export default function ProfilePage({ onSubmit }: BookFormProps) {
    const { data: session } = useSession()
    const [formData, setFormData] = useState<NewBookData>({
        title: '',
        author: '',
        state: '',
        end_date: '',
        rating: 0,
        comment: '',
      })
    if (!session) {
        return <p>Log in first</p>
    }

    const handleBook = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() 
        console.log(session.user.email)
        const response = await fetch(`/api/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ ...formData, email: session.user.email })
        })
        if (response.ok) {
          console.log({ response })
          setFormData({
            title: '',
            author: '',
            state: '',
            end_date: '',
            rating: 0,
            comment: '',
          })
        } else {
          console.error('Fail in adding new book')
        }
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <h2>Hey {session.user?.email}</h2>
            <form onSubmit={handleBook} className="space-y-5">
            <h1 className="text-center">Add Book</h1>
            <label className="block mb-2 text-center">
            Title:
            <input
                type="text"
                name="title"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border rounded"
            />
            </label>
            <label className="block mb-2 text-center">
            Author:
            <input
                type="text"
                name="author"
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full border rounded"
            />
            </label>
            <label className="block mb-2 text-center">
            <div>State:</div>
            To read <input 
                type="radio"
                name="state"
                value="to_read"
                onChange={() => setFormData({ ...formData, state: 'TO_READ' })}
                className="w-full border rounded py-2 px-3"/>
            Reading <input 
                type="radio"
                name="state"
                value="reading"
                onChange={() => setFormData({ ...formData, state: 'READING' })}
                className="w-full border rounded py-2 px-3"/>
            Finished <input 
                type="radio"
                name="state"
                value="finished"
                onChange={() => setFormData({ ...formData, state: 'FINISHED' })}
                className="w-full border rounded py-2 px-3"/>
            </label>

            {formData.state === 'FINISHED' && (
                <div className="text-center">
                    <label className="block mb-2">
                    Rating:
                    <input
                        type="number"
                        name="rating"
                        min={1}
                        max={5}
                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                        className="w-full border rounded"
                    />
                    </label>
                    <label className="block mb-2">
                    Comment:
                    <textarea
                        name="comment"
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        className="w-full border rounded"
                    />
                    </label> 
                </div>
            )}

            <button
                type="submit"
                className="bg-slate-300 py-2 px-4 rounded mx-auto block hover:bg-pink-200 ">
                Add book
            </button>
    </form>
        </div>
    )
}