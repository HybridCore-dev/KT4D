export type UserStatusStep =
  | "QUIZ_INPROGRESS"
  | "QUIZ_COMPLETED"
  | "WAITING_OTHER_USERS"
  | "PLATFORM_STRUCTURE_INFO"
  | "DOCUMENT_TYPE_SELECTION"
  | "PROMPT";

export interface UserStatus {
  current: UserStatusStep;
  next: UserStatusStep;
  history: UserStatusHistory[];
}

export interface UserStatusHistory {
  step: UserStatusStep;
  details: object;
}
