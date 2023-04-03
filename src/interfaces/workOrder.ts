export interface IWorkOrder {
  assetId: number;
  assignedUserIds: number[];
  checklist: ChecklistItem[];
  description: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}

interface ChecklistItem {
  completed: boolean;
  task: string;
}
