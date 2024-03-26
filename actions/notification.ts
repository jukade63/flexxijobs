"use server"

import { getSession } from "@/lib/util-fns/get-session"
import { BACKEND_URL } from "@/lib/constants"

export const getNotifications = async () => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/notification`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        },
        next: { tags: ['notifications'] }
    })
    return await res.json()
}
