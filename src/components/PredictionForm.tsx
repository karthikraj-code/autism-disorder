
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { predictWithModels } from "@/lib/prediction";

const formSchema = z.object({
  age: z.number().min(1).max(100),
  gender: z.enum(["m", "f"]),
  jaundice: z.enum(["yes", "no"]),
  family_history: z.enum(["yes", "no"]),
  relation: z.string(),
  ethnicity: z.string(),
  used_app_before: z.enum(["yes", "no"]),
  result: z.number().min(0).max(10),
  age_desc: z.enum(["18_or_more", "less_than_18"]),
  a1: z.enum(["0", "1"]),
  a2: z.enum(["0", "1"]),
  a3: z.enum(["0", "1"]),
  a4: z.enum(["0", "1"]),
  a5: z.enum(["0", "1"]),
  a6: z.enum(["0", "1"]),
  a7: z.enum(["0", "1"]),
  a8: z.enum(["0", "1"]),
  a9: z.enum(["0", "1"]),
  a10: z.enum(["0", "1"]),
});

type PredictionFormProps = {
  onPredictionResult: (result: any) => void;
};

export default function PredictionForm({ onPredictionResult }: PredictionFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
      gender: "m",
      jaundice: "no",
      family_history: "no",
      relation: "Self",
      ethnicity: "White-European",
      used_app_before: "no",
      result: 0,
      age_desc: "18_or_more",
      a1: "0",
      a2: "0",
      a3: "0",
      a4: "0",
      a5: "0",
      a6: "0",
      a7: "0",
      a8: "0",
      a9: "0",
      a10: "0",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      
      // Convert form data to model input format
      const modelInput = {
        age: values.age,
        gender: values.gender === "m" ? 1 : 0,
        jaundice: values.jaundice === "yes" ? 1 : 0,
        family_history: values.family_history === "yes" ? 1 : 0,
        used_app_before: values.used_app_before === "yes" ? 1 : 0,
        result: values.result,
        age_desc: values.age_desc === "18_or_more" ? 1 : 0,
        a1: parseInt(values.a1),
        a2: parseInt(values.a2),
        a3: parseInt(values.a3),
        a4: parseInt(values.a4),
        a5: parseInt(values.a5),
        a6: parseInt(values.a6),
        a7: parseInt(values.a7),
        a8: parseInt(values.a8),
        a9: parseInt(values.a9),
        a10: parseInt(values.a10),
      };
      
      // Get predictions from multiple models
      const predictions = await predictWithModels(modelInput);
      onPredictionResult(predictions);
      
      toast({
        title: "Prediction Complete",
        description: "Model predictions have been generated successfully.",
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem generating the predictions.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="m" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="f" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="jaundice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Born with jaundice?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="family_history"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family history of autism?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="relation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Who is completing this form?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Self">Self</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                        <SelectItem value="Caregiver">Caregiver</SelectItem>
                        <SelectItem value="Medical staff">Medical staff</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ethnicity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ethnicity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ethnicity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="White-European">White-European</SelectItem>
                        <SelectItem value="Hispanic">Hispanic</SelectItem>
                        <SelectItem value="Black">Black</SelectItem>
                        <SelectItem value="Asian">Asian</SelectItem>
                        <SelectItem value="Middle Eastern">Middle Eastern</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Screening Questions</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4 text-sm text-gray-600">
                  Please answer the following screening questions with Yes (1) or No (0):
                </p>
                
                {[
                  { id: "a1", question: "Does the individual look at you when you call their name?" },
                  { id: "a2", question: "How easy is it for you to get eye contact with the individual?" },
                  { id: "a3", question: "Does the individual point to indicate that they want something?" },
                  { id: "a4", question: "Does the individual point to share interest with you?" },
                  { id: "a5", question: "Does the individual pretend?" },
                  { id: "a6", question: "Does the individual follow where you're looking?" },
                  { id: "a7", question: "If you or someone else in the family is visibly upset, does the individual show signs of wanting to comfort them?" },
                  { id: "a8", question: "Would you describe the individual's first words as typical?" },
                  { id: "a9", question: "Does the individual use simple gestures?" },
                  { id: "a10", question: "Does the individual stare at nothing with no apparent purpose?" },
                ].map((question) => (
                  <FormField
                    key={question.id}
                    control={form.control}
                    name={question.id as any}
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="text-sm">{question.question}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="0" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="1" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                
                <FormField
                  control={form.control}
                  name="result"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overall screening score (0-10):</FormLabel>
                      <div className="flex items-center space-x-4">
                        <FormControl className="flex-grow">
                          <Slider
                            value={[field.value]}
                            min={0}
                            max={10}
                            step={1}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                        <span className="w-8 text-center font-medium">{field.value}</span>
                      </div>
                      <FormDescription>
                        Based on your answers to the questions above, rate the overall score.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button type="submit" className="px-8" disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Generate Prediction"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
