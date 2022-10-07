import { useDispatch } from 'react-redux';
import type { AppThunkDispatch } from '../store/store';

const useAppDispatch: () => AppThunkDispatch = useDispatch;

export default useAppDispatch;
