"use server"
import { getSession } from "@/lib/util-fns/get-session"
import { BACKEND_URL } from "@/lib/constants"
import { revalidatePath } from "next/cache"

export const getFavoutiteJobs = async () => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/jobs/favorites`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        },
    })
    return await res.json()
}

export async function addToFavorites(jobId: number) {

    const session = await getSession()
    try {
        const res = await fetch(`${BACKEND_URL}/jobs/${jobId}`, {
            method: "PATCH",
            body: JSON.stringify({ isFavorite: true }),
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            if (res.status === 403) {
                return {
                    error: "Only registered worker user can perform this action",
                }
            } else if (res.status === 409) {
                return {
                    error: "You have added this job to favorites",
                }
            } else {
                return {
                    error: "Failed to add to favorites",
                }
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                error: error.message
            }
        }
        revalidatePath("/worker/favorites");
    }
}

export async function removeFromFavorites(jobId: number) {

    const session = await getSession()
    await fetch(`${BACKEND_URL}/jobs/${jobId}`, {
        method: 'PATCH',
        body: JSON.stringify({ isFavorite: false }),
        headers: {
            'Authorization': `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    revalidatePath("/worker/favorites")
}

export const getCompletedJobs = async () => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/jobs/completed`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        },
    })
    return await res.json()
}