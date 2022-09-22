import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppThunkDispatch } from '../store/store';

export const useAppDispatch: () => AppThunkDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
