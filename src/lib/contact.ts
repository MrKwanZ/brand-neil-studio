import { z } from "zod";

export const projectTypeOptions = [
  { value: "discovery", label: "Technical consultation" },
  { value: "fullstack", label: "Website or application development" },
  { value: "refactoring", label: "Codebase audit and refactoring" },
  { value: "unsure", label: "Others" },
] as const;

const projectTypeValues = projectTypeOptions.map((option) => option.value) as [
  (typeof projectTypeOptions)[number]["value"],
  ...(typeof projectTypeOptions)[number]["value"][],
];

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email address."),
  projectType: z.enum(projectTypeValues, { message: "Please choose a project type." }),
  challenge: z.string().trim().min(1, "Please describe the current challenge."),
  timeline: z.string().trim().min(1, "Please share the timeline you have in mind."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ProjectType = ContactInput["projectType"];
export type ContactFieldErrors = {
  name?: string[];
  email?: string[];
  projectType?: string[];
  challenge?: string[];
  timeline?: string[];
};

export function projectTypeLabel(value: ProjectType) {
  return projectTypeOptions.find((option) => option.value === value)?.label ?? value;
}
