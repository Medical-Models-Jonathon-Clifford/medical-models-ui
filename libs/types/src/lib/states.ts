export const loading = 'loading';
export const LOADED = 'loaded';

export const LOADING = 'Loading';
export const EDITING = 'Editing';
export const VIEWING = 'Viewing';

export type SimplePageState = typeof loading | typeof LOADED;

export type LoadEditViewState =
  | typeof LOADING
  | typeof EDITING
  | typeof VIEWING;

export const EXPANDED = 'expanded';
export const COLLAPSED = 'collapsed';

export type SideBarState = typeof EXPANDED | typeof COLLAPSED;
