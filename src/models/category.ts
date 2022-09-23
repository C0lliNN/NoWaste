interface Category {
  id: string;
  name: string;
  type: CategoryType;
}

export type CategoryType = 'INCOME' | 'EXPENSE';

export default Category;
