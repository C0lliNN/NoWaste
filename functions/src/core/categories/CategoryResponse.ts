import { CategoryType } from './CategoryType';

export interface CategoryResponse {
  id: string;
  name: string;
  type: CategoryType;
  color: string;
}
