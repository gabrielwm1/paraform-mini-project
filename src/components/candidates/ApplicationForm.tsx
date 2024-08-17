"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/common";
import { addAttachemnt } from "@/handlers/addAttachement";
import { createCandidate } from "@/handlers/createCandidate";
import { convertFileToBase64 } from "@/lib/utils";
import { AddCandidatePayload } from "@/types/candidate";
import { JobPost } from "@/types/jobPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ApplicationFormProps {
  onSuccess: () => void;
  jobPost: JobPost;
}

const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  resume: z.any(),
  coverletter: z.any(),
});

export function ApplicationForm({
  onSuccess,

  jobPost,
}: ApplicationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      email: "",
    },
  });

  //  we need to construct a ts interface out of the questions property within jobPost with the react hook form validation
  // for now the formSchema is set to the known and expected kinds of questions
  const resumeFileRef = form.register("resume");
  const coverLetterRef = form.register("coverletter");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // todo: we need to create the the candidate with application nested inside of it
    // retrieve the application_id for this candidate
    // we can then Add Attachment to application

    const candidatePayload: AddCandidatePayload = {
      first_name: values.first_name,
      last_name: values.last_name,
      title: jobPost.title,
      phone_numbers: [
        {
          type: "personal",
          value: values.phone,
        },
      ],
      email_addresses: [{ type: "personal", email: values.email }],

      applications: [
        {
          job_id: jobPost.job_id,
        },
      ],
    };
    console.log(candidatePayload, "CANDIDATE PAYLOAD");

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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* todo: programattically render a form based on the questions an application has, and allow this to have propper error handling  */}

        {/* {questions.map((question, index) => (
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
              </FormItem>
            )}
          />
        ))} */}

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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
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
          name="coverletter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder=""
                  className="text-sm"
                  {...coverLetterRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
