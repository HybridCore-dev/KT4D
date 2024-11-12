import { SessionJoinRequest } from "@/actions/session/typing";

export interface Props {
  open: boolean;
  loading?: boolean;
  onSubmit(data: SessionJoinRequest): void;
  onCancel(): void;
}
