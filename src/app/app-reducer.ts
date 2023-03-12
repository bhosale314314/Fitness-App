import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as formUi from './shared/ui.reducer';

export interface State {
  ui: formUi.State;
}

export const reducer: ActionReducerMap<State> = {
  ui: formUi.uiReducer,
};

export const getUiState = createFeatureSelector<formUi.State>('ui');
export const getIsLoading = createSelector(getUiState, formUi.getIsLoading);
