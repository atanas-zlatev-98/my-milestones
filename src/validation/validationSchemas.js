import {z} from 'zod';

export const registerSchema = z.object({
  imageUri:z.string().nullable().refine(val => val !== null, {message: "Please select a profile picture"}),
  name: z.string().min(1, "Name is required").min(6, "Name must be at least 6 characters").max(25,'Name must not exceed 25 characters'),
  email: z.string().min(1, "Email is required").email("Invalid email address").max(50,'Email must not exceed 50 characters'),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters").regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      { message: "Must contain at least one letter and one number" }),
  confirmPassword: z.string().min(1, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().min(1,"Email is required"),
  password: z.string().min(1,"Password is required")
});

export const createProjectSchema = z.object({
  backgroundImageUri: z.string().nullable().refine(val => val !== null, {message: "Please select a background image"}),
  iconImageUri: z.string().nullable().refine(val => val !== null, {message: "Please select an icon image"}),
  projectName: z.string().min(1, "Project name is required").min(3, "Project name must be at least 3 characters").max(30,'Project name must not exceed 30 characters'),
  projectField: z.string().min(1, "Project field is required").min(3, "Project field must be at least 3 characters").max(30,'Project field must not exceed 30 characters'),
  projectTasks: z.array(z.object()).nonempty("Project tasks cannot be empty").min(3, "Project must have at least 3 tasks")
})