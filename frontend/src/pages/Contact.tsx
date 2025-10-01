import * as React from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const form = useForm<ContactFormValues>();

  const onSubmit = (values: ContactFormValues) => {
    console.log("Form submitted:", values);
    form.reset();
  };

  return (
    <section className="flex items-center justify-center py-16 min-h-screen bg-background">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-serif font-bold text-center mb-6 text-foreground">
          Contact Us
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          We’d love to hear from you! Whether you have feedback, inquiries, or
          want to collaborate, feel free to reach out to us.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  {...form.register("name", { required: "Name is required" })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  {...form.register("email", { required: "Email is required" })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Write your message..."
                  rows={5}
                  className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  {...form.register("message", {
                    required: "Message is required",
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <Button type="submit" className="w-full py-3">
              Send Message
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Contact;
