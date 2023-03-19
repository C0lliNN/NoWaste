interface Category {
  id: string;
  name: string;
  type: CategoryType;
  color: string;
}

export type CategoryType = 'INCOME' | 'EXPENSE';

export default Category;
