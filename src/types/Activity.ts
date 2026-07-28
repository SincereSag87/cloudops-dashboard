export type ActivityType =
  | "success"
  | "warning"
  | "error"
  | "info";

export interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  type: ActivityType;
}