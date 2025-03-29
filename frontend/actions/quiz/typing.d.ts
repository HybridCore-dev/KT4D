import { SessionDetails } from "../session/typing";

export type AnswerLetterType = "A" | "B" | "C" | "D";

export type ProfileGroupType =
  | "Market Proponent"
  | "Responsible Innovator"
  | "Technology Sceptic"
  | "Balanced Regulator"
  | "Technology Enthusiast"
  | "Social Impact Advocate"
  | "System Critic"
  | "Worker Advocate";

export type UserRoleType = "MODERATOR" | "MEMBER";

export interface ProfileGroup {
  id: number;
  title_en: string;
  details_en: string;
  title_es: string;
  details_es: string;
  title_pl: string;
  details_pl: string;
}

export interface Answer {
  letter: AnswerLetterType;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  answers: Array<Answer>;
}

export interface TestResults {
  [key: number]: AnswerLetterType;
}

export interface SaveTestResultsRequestDTO extends SessionDetails {
  testResults: TestResults;
}

export interface SaveTestResultsResponseDTO extends SessionDetails {
  groupType: number;
}

export interface SessionStatsRequest {
  sessionId: number;
  userId: number;
}

export interface SessionStats {
  sessionUserCount: number;
  sessionFinishedTestCount: number;
}
