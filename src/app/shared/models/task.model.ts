export interface Task {
  _id: string;
  title: string;
  description: string | null;
  done: boolean;
  date: Date;
  list: string;
}
