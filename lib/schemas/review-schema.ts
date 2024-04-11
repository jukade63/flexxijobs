import { z } from "zod";

export const reviewSchema = z.object({
    content: z.string().min(1, { message: "content is required" }),
    value: z.number().min(1, { message: "value is required" }),
    workerId: z.number().min(1, { message: "workerId is required" }),
    jobId: z.number().min(1, { message: "jobId is required" }),
})