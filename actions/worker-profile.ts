"use server"

import { getSession } from "@/lib/util-fns/get-session";
import { BACKEND_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";

type Data = Education | Experience | Skill

type ProfileData = {
    section: string
    values: Data
}
export const getProfileData = async (section: string) => {
    const session = await getSession();
    if(!session) throw new Error("Unauthorized")
    
    const res = await fetch(`${BACKEND_URL}/${section}/${session?.user?.id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.message)
    console.log(res.status);
    
    return data
}

export const addProfileData = async ({section, values}: ProfileData) => {

    const session = await getSession();
    const res = await fetch(`${BACKEND_URL}/${section}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...values, userId: session?.user?.id})
    })
    const  data = await res.json()
    if(!res.ok) throw new Error(data.message)
    revalidatePath("/worker/profile")
    return data
}

export const updateProfileData = async ({section, values}: ProfileData) => {
    const session = await getSession();
    const res = await fetch(`${BACKEND_URL}/${section}/${values.id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    })
    const data =  await res.json()
    if(!res.ok) throw new Error(data.message)
    revalidatePath("/worker/profile")
    return data
}

export const deleteProfileData = async ({ section, id, }: { section: string, id: number}) => {
    const session = await getSession()
        const res = await fetch(`${BACKEND_URL}/${section}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        revalidatePath("/worker/profile")
        return data
}

export const getAllProfileData = async () => {
    const session = await getSession();
    if(!session) throw new Error("Unauthorized")
    
    const res = await fetch(`${BACKEND_URL}/user`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.message)
    
    return data
}

export const getAllEducation = async (userId: number) => {
    const res = await fetch(`${BACKEND_URL}/education/${userId}`, { next: { tags: ['education'] } })
    return await res.json()
}