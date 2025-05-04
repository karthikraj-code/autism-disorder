
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  author_name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  relationship: z.string().min(1, "Please select your relationship"),
});

type StoryFormValues = z.infer<typeof formSchema>;

const StorySubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<StoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author_name: "",
      title: "",
      content: "",
      relationship: "",
    },
  });

  const onSubmit = async (values: StoryFormValues) => {
    setIsSubmitting(true);
    try {
      // Ensure all required fields are passed with their non-optional values
      const { error } = await supabase.from("stories").insert({
        author_name: values.author_name,
        title: values.title,
        content: values.content,
        relationship: values.relationship
      });
      
      if (error) throw error;
      
      toast.success("Thank you for sharing your story! It will be reviewed and published soon.");
      form.reset();
    } catch (error) {
      console.error("Error submitting story:", error);
      toast.error("There was a problem submitting your story. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="author_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="How you'd like to be identified" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="relationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship to Autism</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your relationship to autism" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Person with autism">I have autism</SelectItem>
                  <SelectItem value="Parent">I'm a parent of someone with autism</SelectItem>
                  <SelectItem value="Sibling">I'm a sibling of someone with autism</SelectItem>
                  <SelectItem value="Other family">I'm a family member</SelectItem>
                  <SelectItem value="Caregiver">I'm a caregiver</SelectItem>
                  <SelectItem value="Professional">I'm a professional who works with autism</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Story Title</FormLabel>
              <FormControl>
                <Input placeholder="A title for your story" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Story</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Share your experiences with autism..." 
                  className="min-h-48" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Share Your Story"}
        </Button>
      </form>
    </Form>
  );
};

export default StorySubmissionForm;
