import { useDispatch as dp, useSelector as us } from 'react-redux';
import type { RootState, AppDispatch } from './app.store';

export const useDispatch = dp.withTypes<AppDispatch>()
export const useSelector = us.withTypes<RootState>()