import { SessionCreateRequest } from "@/actions/session/typing";

export interface Props {
  open: boolean;
  loading?: boolean;
  onSubmit(data: SessionCreateRequest): void;
  onCancel(): void;
}
