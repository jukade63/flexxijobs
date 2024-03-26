"use server"
import { getSession } from "@/lib/util-fns/get-session"
import { BACKEND_URL } from "@/lib/constants"

export const getWorkerById = async (id: number) => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/workers/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    return await res.json()
}