import { SessionJoinResponse } from "@/actions/session/typing";
import { getItem, removeItem, setItem } from "./actions";
import { ProfileGroupType, UserRoleType } from "@/actions/quiz/typing";
import { DocumentType } from "@/actions/prompt/typing";
import { UserStatus } from "@/actions/user/typing";

const PREFIX = "KT4D";

export const set = (session: SessionJoinResponse) => {
  return setItem(`${PREFIX}.currentSession`, session);
};

export const get = () => {
  return getItem<SessionJoinResponse>(`${PREFIX}.currentSession`);
};

export const remove = () => {
  const session = get();

  if (!session) return false;

  // Remove profile type
  removeItem(`${PREFIX}.profileType.${session.sessionId}.${session.userId}`);

  // Remove user role
  removeItem(`${PREFIX}.userRole.${session.sessionId}.${session.userId}`);

  // Remove document types
  removeItem(`${PREFIX}.documentTypes.${session.sessionId}.${session.userId}`);

  return removeItem(`${PREFIX}.currentSession`);
};

export const setProfileType = (type: ProfileGroupType) => {
  const session = get();

  if (!session) return false;

  return setItem(
    `${PREFIX}.profileType.${session.sessionId}.${session.userId}`,
    type
  );
};

export const getProfileType = () => {
  const session = get();

  if (!session) return null;

  return getItem<ProfileGroupType>(
    `${PREFIX}.profileType.${session.sessionId}.${session.userId}`
  );
};

export const setProfileId = (id: number) => {
  const session = get();

  if (!session) return false;

  return setItem(
    `${PREFIX}.profileTypeId.${session.sessionId}.${session.userId}`,
    id
  );
};

export const getProfileId = () => {
  const session = get();

  if (!session) return null;

  return getItem<number>(
    `${PREFIX}.profileTypeId.${session.sessionId}.${session.userId}`
  );
};

export const setUserRole = (role: UserRoleType) => {
  const session = get();

  if (!session) return false;

  return setItem(
    `${PREFIX}.userRole.${session.sessionId}.${session.userId}`,
    role
  );
};

export const getUserRole = () => {
  const session = get();

  if (!session) return null;

  return getItem<UserRoleType>(
    `${PREFIX}.userRole.${session.sessionId}.${session.userId}`
  );
};

export const setDocumentTypes = (documentTypes: DocumentType[]) => {
  const session = get();

  if (!session) return false;

  return setItem(
    `${PREFIX}.documentTypes.${session.sessionId}.${session.userId}`,
    documentTypes
  );
};

export const getDocumentTypes = () => {
  const session = get();

  if (!session) return null;

  return getItem<DocumentType[]>(
    `${PREFIX}.documentTypes.${session.sessionId}.${session.userId}`
  );
};

export const setUserStatus = (status: UserStatus) => {
  const session = get();

  if (!session) return false;

  return setItem(
    `${PREFIX}.userStatus.${session.sessionId}.${session.userId}`,
    status
  );
};

export const getUserStatus = () => {
  const session = get();

  if (!session) return null;

  return getItem<UserStatus>(
    `${PREFIX}.userStatus.${session.sessionId}.${session.userId}`
  );
};
