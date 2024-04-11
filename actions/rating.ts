"use server"

import { ReviewFormData } from "@/app/(root)/business/(main)/history/_components/ReviewForm"
import { BACKEND_URL } from "@/lib/constants"
import { getSession } from "@/lib/util-fns/get-session"
import { revalidatePath } from "next/cache"

export async function addRating(values: ReviewFormData) {

    const session = await getSession()
    await fetch(`${BACKEND_URL}/ratings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(values),
    })
    revalidatePath("/business/history")
}

export const getRating = async (workerId: number, jobId: number) => {
    const session = await getSession()
    if (!session) {
        return {
            error: "Unauthorized"
        }
    }
    const res = await fetch(`${BACKEND_URL}/ratings/worker/${workerId}/job/${jobId}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    })
    const data = await res.json()

    if (res.status === 404) {
        return {
            error: data.message,
        }
    }
    return data
}

export const getRatingsByWorker = async (workerId?: number) => {

    const session = await getSession()
    if (!session) {
        return {
            error: "Unauthorized"
        }
    }
    let url = `${BACKEND_URL}/ratings`
    if (workerId) {
        url += `?workerId=${workerId}`
    }
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
    })
    const data = await res.json()
    if (res.status === 404) {
        return {
            error: data.message,
        }
    }
    return data
}