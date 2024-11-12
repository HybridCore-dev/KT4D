import { SessionDetails } from "../session/typing";

export type DocumentType =
  | "NEWSLETTER_ARTICLES"
  | "ACADEMIC_PAPERS"
  | "POLICY_PAPERS";

export interface PromptRequestDTO extends SessionDetails {
  prompt: string;
  documentTypes: Array<DocumentType>;
}

export interface PromptResponseDTO {
  answer: string;
}
