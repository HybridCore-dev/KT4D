export type SessionJoinUserType = "MODERATOR" | "NEW_USER" | "EXISTING_USER";

export interface Session {
  id: number;
  name: string;
  active: boolean;
  createDate: string;
}

export interface SessionCreateRequest {
  name: string;
  moderatorPassword: string;
  sessionPassword: string;
}

export interface SessionCreateResponse {
  sessionId: number;
  userId: number;
}

export interface SessionJoinRequest {
  sessionId: number;
  userType: SessionJoinUserType;
  userName?: string;
  sessionPassword?: string;
  password?: string;
}

export interface SessionJoinResponse {
  sessionId: number;
  userId: number;
  userName?: string;
}

export interface SessionEndRequest {
  sessionId: number;
  userId: number;
}
