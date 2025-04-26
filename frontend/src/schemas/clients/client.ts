import { z } from "zod";

const today = new Date();

const createClientSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(100, "First name must be at most 100 characters"),
  last_name: z.string().min(1, "Last name is required").max(100, "Last name must be at most 100 characters"),
  id_number: z.string().min(1, "ID number is required").max(8, "ID number must be at most 20 characters"),
  date_of_birth: z.string().refine((dateStr) => {
      const date = new Date(dateStr);
      return date <= today;
    }, "Date of birth cannot be in the future"),
  phone_number: z.string().min(10, "Phone number must be at most 10 digits"),
  gender: z.string().min(1, "Gender is required"),
});

export default createClientSchema;
