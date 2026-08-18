"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { ContactFieldErrors } from "@/lib/contact";

const emptyForm = { name: "", email: "", message: "" };

const sendErrorMessage = "Oops... something went wrong. Please try sending the message again later.";

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
        return;
      }

      if (!response.ok) {
        toast.error(sendErrorMessage, {
          icon: <XCircle className="h-5 w-5 text-red-600" />,
        });
        return;
      }

      toast.success("Your message was sent successfully.", {
        icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      });
      setForm(emptyForm);
    } catch {
      toast.error(sendErrorMessage, {
        icon: <XCircle className="h-5 w-5 text-red-600" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-xl border border-border bg-card p-7"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          value={form.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Your name"
          className={errors.name ? "border-destructive" : undefined}
        />
        {errors.name?.[0] ? (
          <p id="name-error" className="text-sm text-destructive">
            {errors.name[0]}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="text"
          inputMode="email"
          autoComplete="email"
          value={form.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="you@company.com"
          className={errors.email ? "border-destructive" : undefined}
        />
        {errors.email?.[0] ? (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email[0]}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          value={form.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="What are you building?"
          className={errors.message ? "border-destructive" : undefined}
        />
        {errors.message?.[0] ? (
          <p id="message-error" className="text-sm text-destructive">
            {errors.message[0]}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send message"
          )}
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={isSubmitting}
          className="rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-sand disabled:pointer-events-none disabled:opacity-50 sm:min-w-28"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
