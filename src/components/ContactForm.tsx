"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/Reveal";
import { projectTypeOptions, type ContactFieldErrors } from "@/lib/contact";

const emptyForm = {
  name: "",
  email: "",
  projectType: "",
  challenge: "",
};

const visibleFields = ["name", "email", "projectType", "challenge"] as const;

const sendErrorMessage =
  "Oops... something went wrong. Please try sending the message again later.";

export function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onReset = () => {
    setForm(emptyForm);
    setErrors({});
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { ok?: boolean; errors?: ContactFieldErrors };

      if (response.status === 400 && data.errors) {
        setErrors(data.errors);
        const hasVisibleError = visibleFields.some((field) => data.errors?.[field]?.length);
        if (hasVisibleError) return;
      }

      if (!response.ok) {
        toast.error(sendErrorMessage, {
          icon: <XCircle className="h-5 w-5 text-destructive" />,
        });
        return;
      }

      toast.success("Message sent successfully.", {
        icon: <CheckCircle2 className="h-5 w-5 text-foreground" />,
      });
      setForm(emptyForm);
    } catch {
      toast.error(sendErrorMessage, {
        icon: <XCircle className="h-5 w-5 text-destructive" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-[40px] bg-card p-6 md:p-8"
      aria-busy={isSubmitting}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal>
          <Field
            id="name"
            label="Name"
            error={errors.name?.[0]}
            value={form.name}
            autoComplete="name"
            placeholder="Your name"
            onChange={(value) => updateField("name", value)}
          />
        </Reveal>
        <Reveal delay={60}>
          <Field
            id="email"
            label="Email"
            type="text"
            inputMode="email"
            error={errors.email?.[0]}
            value={form.email}
            autoComplete="email"
            placeholder="you@company.com"
            onChange={(value) => updateField("email", value)}
          />
        </Reveal>
      </div>
      <Reveal delay={120}>
        <div className="space-y-2">
          <Label htmlFor="projectType">Project type</Label>
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            onChange={(event) => updateField("projectType", event.target.value)}
            className={`field ${errors.projectType ? "border-destructive" : ""}`}
          >
            <option value="">Choose a project type</option>
            {projectTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.projectType?.[0] ? (
            <p id="projectType-error" className="text-sm text-destructive">
              {errors.projectType[0]}
            </p>
          ) : null}
        </div>
      </Reveal>
      <Reveal delay={180}>
        <div className="space-y-2">
          <Label htmlFor="challenge">Current challenge</Label>
          <Textarea
            id="challenge"
            name="challenge"
            rows={5}
            value={form.challenge}
            aria-invalid={Boolean(errors.challenge)}
            aria-describedby={errors.challenge ? "challenge-error" : undefined}
            onChange={(event) => updateField("challenge", event.target.value)}
            placeholder="What is getting in the way?"
            className={`min-h-32 rounded-[20px] border-foreground/45 bg-surface px-5 py-3 text-base shadow-none md:text-base ${errors.challenge ? "border-destructive" : ""}`}
          />
          {errors.challenge?.[0] ? (
            <p id="challenge-error" className="text-sm text-destructive">
              {errors.challenge[0]}
            </p>
          ) : null}
        </div>
      </Reveal>
      <Reveal delay={300}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
            {isSubmitting ? "Sending inquiry" : "Send inquiry"}
          </button>
          <button type="button" onClick={onReset} disabled={isSubmitting} className="btn-secondary">
            Reset
          </button>
        </div>
      </Reveal>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "text";
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`field md:text-base ${error ? "border-destructive" : ""}`}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
