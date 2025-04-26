import { z } from "zod";


const programSchema = z.object({
  name: z.string().min(1, "Progam name is required").max(100, "Promgram name must be at most 100 characters"),
  description: z.string().optional().nullable(),
 
});

export default programSchema;
