export type NotificationType = "success" | "warning" | "error";

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  isRead: boolean;
}