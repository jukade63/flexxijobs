"use server";
import { getSession } from "@/lib/util-fns/get-session";
import { BACKEND_URL } from "@/lib/constants";
import { revalidatePath, revalidateTag} from "next/cache";

export async function createJobPost(data: any){
    const session = await getSession()
    try {
        await fetch(BACKEND_URL + "/job-posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(data),
        })
    } catch(error) {
        console.log(error);
        throw Error('Failed to create post')
    }
    revalidatePath('/business/job-posts')
}

export async function updateJobPost(id: number, data: JobPost) {
    
    const session = await getSession()
    try {
        const res = await fetch(`${BACKEND_URL}/job-posts/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(data),
        });
        revalidateTag('business-job-posts')
        return await res.json();
    } catch(error) {
        console.log(error);
        
        throw Error('Failed to update post')
    }
}

export const getAllJobs = async (page: number, limit: number, location?: string, category?: string, jobType?: string) => {

    const start = (page - 1) * limit;

    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    params.append('start', start.toString());
    if (location) params.append('location', location);
    if (category) params.append('category', category);
    if (jobType) params.append('jobType', jobType);

    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
        const res = await fetch(`${BACKEND_URL}/job-posts?${params.toString()}`, { cache: 'no-store' })
        return await res.json()
    } catch (error) {
        console.log(error)
        return []
    }
}

export const getJobPostsByBusiness = async () => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/job-posts/business`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        },
    })
    const jobPosts = await res.json(); 
    return jobPosts;
}

export const getJobPostById = async (id: number) => {
    const res = await fetch(`${BACKEND_URL}/job-posts/${id}`, {
        next: {
            tags: ['jobById']
        }
    })
    return await res.json()
    
}

export const getJobPostByIdByBusiness = async (id: number) => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/job-posts/business/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    await new Promise(resolve => setTimeout(resolve, 1000))
    return await res.json()
}
