import { z } from "zod";

export const experiencesSchema = z.object({
    position: z.string().min(1, { message: "Position is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    company: z.string().min(1, { message: "Company is required" }),
    startDate: z.date(),
    endDate: z.date(),
}).refine((data) => data.startDate < data.endDate, {
    message: "End date must be after start date",
    path: ["endDate"],

})

export const educationSchema = z.object({
    institution: z.string().min(1),
    degree: z.string().min(1),
    major: z.string().min(1),
    gradDate: z.date(),
  });
  

  export const skillSchema = z.object({
    skillName: z.string().min(1),
    skillLevel: z.string().min(1),
    certification: z.string().optional(),  
    certLink: z.string().optional(),
  })