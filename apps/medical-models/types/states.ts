export const LOADING = 'Loading';
export const EDITING = 'Editing';
export const VIEWING = 'Viewing';

export type SimplePageState = 'loading' | 'loaded';
export type LoadEditViewState =
  | typeof LOADING
  | typeof EDITING
  | typeof VIEWING;
