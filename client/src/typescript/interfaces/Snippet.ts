import { Model } from '.';

export interface NewSnippet {
  title: string;
  description?: string;
  language: string;
  code: string;
  docs?: string;
}

export interface Snippet extends Model, NewSnippet {}
