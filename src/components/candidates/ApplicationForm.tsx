"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Textarea,
} from "@/components/common";
import { AddCandidatePayload } from "@/types/candidate";
import { createCandidate } from "@/handlers/createCandidate";
import { addAttachemnt } from "@/handlers/addAttachement";
import { Attachment } from "@/types/attachment";
import { convertFileToBase64 } from "@/lib/utils";
import { JobPost } from "@/types/jobPost";
import { Question } from "@/types/application_question";

interface ApplicationFormProps {
  onSuccess: () => void;
  onClose: () => void;
  job_id: string;
  questions: Pick<JobPost, "questions">["questions"];
}

const generateFormSchema = (questions: Question[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  questions.forEach((question) => {
    if (question.type === "short_text") {
      shape[question.name] = question.required
        ? z.string({ message: `The ${question.label} field is required.` })
        : z.string().optional();
    } else if (question.type === "attachment") {
      shape[question.name] = question.required
        ? z.any({ message: `The ${question.label} field is required.` })
        : z.any().optional();
    }
  });

  return z.object(shape);
};

// const formSchema = z.object({
//   first_name: z.string(),
//   last_name: z.string(),
//   email: z.string().email(),
//   linkedin_url: z.string().url(),
//   github_profile_url: z.string().url(),
//   portfolio_url: z.string(),
//   answer: z.string(),
//   resume: z.any(),
// });

export function ApplicationForm({
  onSuccess,
  onClose,
  jobPost,
}: {
  onSuccess: () => void;
  onClose: () => void;
  jobPost: JobPost;
}) {
  const questions: Question[] = jobPost.questions;
  const formSchema = generateFormSchema(questions);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      email: "",
    },
  });

  //   we need to construct a ts interface out of the questions property within jobPost for the react hook form validation

  //   ideally need to be fetchign the job posting by ID here and getting the questions, for now hardcoded

  const resumeFileRef = form.register("resume");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // todo: we need to create the the candidate with application nested inside of it
    // retrieve the application_id for this candidate
    // we can then Add Attachment to application
    //we need to programmatically build this payload by looking at the form
    const candidatePayload: AddCandidatePayload = {
      first_name: values.first_name,
      last_name: values.last_name,
      email_addresses: [{ type: "personal", email: values.email }],
      website_addresses: [
        { type: "personal", url: values.linkedin_url },
        { type: "portfolio", url: values.portfolio_url },
        { type: "personal", url: values.github_profile_url },
      ],
      applications: [
        {
          job_id: jobPost.job_id,
          answers: [{ question: "test", answer: values.answer }],
        },
      ],
    };

    try {
      // create candidate
      const candidate = await createCandidate({ payload: candidatePayload });
      //   retrieve application Id from the response , for now hard coded
      const application_id = "123";
      //   construct attachment payload

      const base64SFileString = await convertFileToBase64(values.resume[0]);

      await addAttachemnt({
        application_id: application_id,
        attachmentPayload: {
          content: base64SFileString,
          type: "resume",
          filename: values.resume[0]?.name,
          content_type: values.resume[0].type,
        },
      });

      // const ad
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {questions.map((question, index) => (
          <FormField
            key={index}
            control={form.control}
            name={question.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{question.label}</FormLabel>
                <FormControl>
                  {question.type === "short_text" ? (
                    <Input
                      placeholder={question.description || ""}
                      {...field}
                      type={question.type}
                    />
                  ) : question.type === "attachment" ? (
                    <Input
                      placeholder={question.description || ""}
                      {...field}
                      type="file"
                    />
                  ) : null}
                </FormControl>
                {/* <FormMessage>{errors[question.name]?.message}</FormMessage> */}
              </FormItem>
            )}
          />
        ))}
        {/* <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder=""
                  className="text-sm"
                  {...resumeFileRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin profile url</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.linkedin.com/in/username/"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github_profile_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github profile url</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/username/" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolio_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Porfolio Url</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Can you provide an example of a dish where your intuition played
                a crucial role?
              </FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
