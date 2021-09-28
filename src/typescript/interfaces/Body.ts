export interface Body {
  title: string;
  description?: string;
  language: string;
  code: string;
  docs?: string;
  isPinned: boolean;
  tags: string[];
}
