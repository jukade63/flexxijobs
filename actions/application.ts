"use server"

import { getSession } from "@/lib/util-fns/get-session"
import { BACKEND_URL } from "@/lib/constants"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export async function applyJob(jobPostId: number) {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/applications/${jobPostId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    if (res.ok) {
        redirect("/worker/applied-jobs");
    } else {
        if (res.status === 403) {
            return {
                error: "Only worker user can perform this action",
            }
        } else if (res.status === 409) {
            return {
                error: "You have already applied for this job",
            }

        } else {
            return {
                error: "Failed to apply for job",
            }
        }
    }
}

export async function cancelApplication(id: number) {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/applications/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    })
    if (!res.ok) {
        const error = await res.json()
        return {
            error: error.message
        }
    }
    revalidatePath("/worker/applied-jobs")

    return {
        message: "Application cancelled successfully",
    }
}

async function updateApplicationStatus(applicationId: number, jobPostId: number, status: string) {
    const session = await getSession();
    try {
        await fetch(`${BACKEND_URL}/applications/${applicationId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify({ jobPostId, status }),
        });
    } catch (error) {
        return {
            error: "Failed to update application status",
        }

    }
    revalidatePath("/business/job-posts");


}

export async function acceptApplication(applicationId: number, jobPostId: number) {
    await updateApplicationStatus(applicationId, jobPostId, "accepted");
}

export async function rejectApplication(applicationId: number, jobPostId: number) {
    await updateApplicationStatus(applicationId, jobPostId, "rejected");
}

export const getApplicationsByWorker = async () => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/applications/worker/all`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        },
    },)
    return await res.json()
}


