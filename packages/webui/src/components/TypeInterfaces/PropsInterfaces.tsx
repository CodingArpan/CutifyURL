export interface AlertPropsType {
  type: "success" | "error" | "warning"|"";
  title?: string;
  message?: string;
  list?: string[];
}
export type UserType = { name: string; ref: string } | null;
