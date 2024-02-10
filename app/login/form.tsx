'use client'

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"

export default async function Form() {
    const router = useRouter()
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() 
        const formData = new FormData(e.currentTarget)
        const response = await signIn('credentials', {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false
        })
        console.log({ response })
        if (response?.error) {
          console.log(response.error)
        } else {
          router.push("/")
          router.refresh()
        }
    }

    return (
        <div className="flex flex-col items-center justify-center md:h-screen">
        <div className="border rounded px-10 py-10">
        <h2 className="text-2xl font-bold mb-4 py-4 text-center">Log in</h2>
        <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
          <label className="block mb-2 text-center">
            Username:
            <input
              type="text"
              name="username"
              className="w-full border rounded py-2 px-3"
            />
          </label>
          <label className="block mb-2 text-center">
            Password:
            <input
              type="password"
              name="password"
              className="w-full border rounded py-2 px-3"
            />
          </label>
          <button
            type="submit"
            className="bg-pink-300 py-2 px-4 rounded mx-auto block hover:bg-pink-400 "
          >Login
          </button>
        </form>
        </div>
      </div>
    )
}