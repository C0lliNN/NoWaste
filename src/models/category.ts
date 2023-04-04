interface Category {
  id: string;
  name: string;
  type: CategoryType;
  color: string;
  useCount?: number;
}

export type CategoryType = 'INCOME' | 'EXPENSE';

export default Category;
