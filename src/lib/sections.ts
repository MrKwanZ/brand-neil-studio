export const pageSections = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
] as const;

export const contactSection = {
  id: "contact",
  label: "Start a project",
} as const;

export const observedSectionIds = [
  ...pageSections.map((section) => section.id),
  contactSection.id,
] as const;

export function sectionHref(id: string) {
  return `/#${id}`;
}
