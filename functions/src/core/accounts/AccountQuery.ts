type AvailableSortField = 'name' | 'balance';
type SortDirection = 'asc' | 'desc';

interface AccountQuery {
  userId: string;
  sortBy: AvailableSortField;
  sortDirection: SortDirection;
}
