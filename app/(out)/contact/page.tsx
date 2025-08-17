"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ADDITIONAL_PAGES } from "@/lib/config";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SectionHeader from "@/components/SectionHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
const { contact } = ADDITIONAL_PAGES;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Submitting form with data:", data);

    try {
      console.log("Starting fetch request to /api/contact");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);

      // Handle non-JSON responses gracefully
      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
        console.log("Response data:", responseData);
      } else {
        const textResponse = await response.text();
        console.log("Non-JSON response:", textResponse);
        responseData = { message: "Received non-JSON response" };
      }

      if (!response.ok) {
        throw new Error(responseData?.message || `Error: ${response.status}`);
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });

      reset();
    } catch (error) {
      console.error("Error details:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Contact"
          title="Get in Touch"
          description="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
          gradientText="CONTACT"
          textHeight={240}
        />

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="space-y-6 lg:col-span-1">
            {/* Office Locations */}
            {contact.locations.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border-border hover:border-primary/50 rounded-lg border p-6 shadow-sm transition-colors"
              >
                <h3 className="mb-4 text-lg font-semibold">{location.city}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-muted-foreground mt-1 h-5 w-5" />
                    <div>
                      <p className="text-muted-foreground">
                        {location.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-muted-foreground h-5 w-5" />
                    <a
                      href={`tel:${location.phone}`}
                      className="text-primary hover:underline"
                    >
                      {location.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Support Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border-border hover:border-primary/50 rounded-lg border p-6 shadow-sm transition-colors"
            >
              <h3 className="mb-4 text-lg font-semibold">Support Hours</h3>
              <div className="flex items-center gap-3">
                <Clock className="text-muted-foreground h-5 w-5" />
                <p className="text-muted-foreground">{contact.supportHours}</p>
              </div>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border-border hover:border-primary/50 rounded-lg border p-6 shadow-sm transition-colors"
            >
              <h3 className="mb-4 text-lg font-semibold">Quick Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-muted-foreground h-5 w-5" />
                  <a
                    href="mailto:support@templatelibrary.com"
                    className="text-primary hover:underline"
                  >
                    support@templatelibrary.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="text-muted-foreground h-5 w-5" />
                  <a href="#" className="text-primary hover:underline">
                    Live Chat
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-card border-border rounded-lg border p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-semibold">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-muted-foreground mb-2 block text-sm font-medium"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      {...register("name")}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-muted-foreground mb-2 block text-sm font-medium"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="text-muted-foreground mb-2 block text-sm font-medium"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    {...register("subject")}
                    className={errors.subject ? "border-red-500" : ""}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-muted-foreground mb-2 block text-sm font-medium"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    rows={6}
                    {...register("message")}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
