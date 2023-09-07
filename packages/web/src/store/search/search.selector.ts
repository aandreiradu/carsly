import { createSelector } from 'reselect';
import { IReduxState } from '..';

const searchState = (state: IReduxState) => state.search;

export const getCachedSearchs = createSelector(searchState, (state) => state.searchResults?.queries);
