import { useMemo } from 'react';
import Category, { CategoryType } from '../models/category';
import useAppSelector from './useAppSelector';

export default function useFilteredCategories(type?: CategoryType): Category[] {
  const categories = useAppSelector((state) => state.categories.categories);

  return useMemo(() => categories.filter((c) => c.type === type), [categories, type]);
}
