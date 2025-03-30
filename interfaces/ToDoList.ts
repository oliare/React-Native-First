export default interface IToDoItem {
  id: number;
  todo: string;
  completed: boolean;
  date: string;
  deadline: string;
  priority: string;
  status: string;
  notificationId: string | null;
}
