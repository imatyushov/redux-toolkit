import {
    ActionCreator,
    ActionCreatorsMapObject,
    AsyncThunk,
    bindActionCreators
} from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootStore, AppDispatch } from './types';


export const useAppDispatch = useDispatch<AppDispatch>;
export const useStateSelector: TypedUseSelectorHook<RootStore> = useSelector;

export const useActionCreators = (actions: ActionCreatorsMapObject) => {
    const dispatch = useAppDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), [])
}