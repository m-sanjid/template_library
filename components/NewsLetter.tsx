"use client"

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ArrowRight, Loader2, Check } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

const NewsLetter = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            
            toast({
                title: "Success!",
                description: "You've been subscribed to our newsletter.",
            });
            
            setIsSuccess(true);
            reset();
            
            // Reset success state after 3 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to subscribe. Please try again later.",
            });
            console.error(error)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto text-center mb-20 border rounded-xl px-4 py-8 h-[20rem] grid grid-cols-1 md:grid-cols-2 items-center gap-8 border-white/10 bg-black/10 dark:bg-white/5 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-8">
                    Subscribe to our newsletter for the latest updates and exclusive offers.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 max-w-md mx-auto">
                    <div className="flex-1">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className={`bg-white/80 border-white/10 dark:bg-black/50 focus:border-white/20 ${
                                errors.email ? "border-red-500" : ""
                            }`}
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1 text-left">{errors.email.message}</p>
                        )}
                    </div>
                    <Button 
                        type="submit" 
                        className="group"
                        disabled={isSubmitting || isSuccess}
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isSuccess ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <>
                                Subscribe
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </Button>
                </form>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <NewsletterPreview />
            </motion.div>
        </div>
    )
}

export default NewsLetter

const NewsletterPreview = () => {
    return (
        <div className='h-full w-full'>
            <div className='h-[18rem] w-full md:w-[20rem] overflow-hidden'>
                <div className='h-full w-full bg-white/50'/>
            </div>
        </div>
    )
}