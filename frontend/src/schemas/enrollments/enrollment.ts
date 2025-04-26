import { z } from "zod";
const createEnrollmentSchema = z.object({

    program_ids: z.array(z.coerce.number().min(1)).min(1, "Select at least one program"),
  });

  export default createEnrollmentSchema;
