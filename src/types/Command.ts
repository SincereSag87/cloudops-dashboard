export type CommandCategory =
  | "Navigation"
  | "Infrastructure"
  | "Actions";

export interface Command {
  id: string;
  label: string;
  description: string;
  category: CommandCategory;
  path?: string;
  keywords: string[];
}