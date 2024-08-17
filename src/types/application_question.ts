type QuestionType = "short_text" | "attachment";

export type Question = {
  required: boolean;
  private: boolean;
  label: string;
  name: string;
  type: QuestionType;
  values: any[];
  description: string | null;
};
