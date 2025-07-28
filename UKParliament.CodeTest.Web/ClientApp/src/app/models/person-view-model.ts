import { DepartmentViewModel } from "./department-view-model";

export interface PersonViewModel {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  department: DepartmentViewModel;
  email: string;
}
