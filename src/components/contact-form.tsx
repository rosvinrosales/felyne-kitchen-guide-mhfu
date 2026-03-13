import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  message: z
    .string()
    .min(10, "Please enter at least 10 characters.")
    .max(2000, "Message is too long."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-lg font-semibold mb-2">Contact me</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Have feedback or suggestions? Send me a message.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your ideas, feedback, or questions about Felyne Kitchen Guide."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={status === "submitting"}
              className="w-full md:w-auto"
            >
              {status === "submitting" ? "Sending..." : "Send message"}
            </Button>
            {status === "success" && (
              <span className="text-sm text-green-600 dark:text-green-500">
                Message sent! Thank you.
              </span>
            )}
            {status === "error" && (
              <span className="text-sm text-destructive">
                Something went wrong. Please try again.
              </span>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

