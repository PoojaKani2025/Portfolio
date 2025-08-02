
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { init, send } from '@emailjs/browser';

// Security-focused validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  // Honeypot field to prevent basic bot submissions
  website: z.string().max(0, 'This field should be empty').optional()
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = React.useState(0);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      website: ''
    }
  });

  // Simple rate limiting - prevent rapid submissions
  const isRateLimited = () => {
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmissionTime;
    return timeSinceLastSubmission < 5000; // 5 seconds minimum between submissions
  };

  // XSS protection - sanitize input
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .trim();
  };

  const onSubmit = async (data: ContactFormData) => {
    // Rate limiting check
    if (isRateLimited()) {
      toast({
        title: "Please wait",
        description: "Please wait a moment before submitting again.",
        variant: "destructive"
      });
      return;
    }

    // Check honeypot field
    if (data.website && data.website.length > 0) {
      console.log('Bot detected - honeypot field filled');
      return;
    }

    setIsSubmitting(true);
    setLastSubmissionTime(Date.now());

    try {
      // Sanitize all inputs
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        subject: sanitizeInput(data.subject),
        message: sanitizeInput(data.message)
      };

      // Initialize EmailJS
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

      init(publicKey);

      const templateParams = {
        from_name: sanitizedData.name,
        from_email: sanitizedData.email,
        subject: sanitizedData.subject,
        message: sanitizedData.message
      };

      await send(serviceID, templateID, templateParams);

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We'll get back to you soon.",
      });

      form.reset();
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Error sending message",
        description: error?.text || error?.message || "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`p-6 bg-white/10 backdrop-blur-sm border-white/20 ${className}`}>
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Your Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your Name"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Your Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Your Email"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      maxLength={100}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Project Subject</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Project Subject"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      maxLength={100}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us about your project..."
                      rows={5}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      maxLength={1000}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            {/* Honeypot field - hidden from users */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-white text-purple-600 hover:bg-gray-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
