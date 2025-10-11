import { ReactNode } from 'react';
import { ListItemButton, ListItemIcon, Tooltip } from '@mui/material';
import {
  borderColorLayoutLines,
  colorBackground,
  colorPrimary,
} from '../../variables';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

export const EXPANDED_SIDE_BAR_WIDTH = 340;
export const COLLAPSED_SIDE_BAR_WIDTH = 20;
export const TOGGLE_BUTTON_WIDTH = 24;

export type SideBarState = 'expanded' | 'collapsed';

export const createToggleButton = (icon: ReactNode) => {
  return function ToggleButton({
    title,
    onClick,
    drawerWidth,
  }: {
    title: string;
    onClick: () => void;
    drawerWidth: number;
  }) {
    return (
      <Tooltip title={title} placement="right">
        <ListItemButton
          onClick={onClick}
          sx={{
            position: 'fixed',
            left: drawerWidth - TOGGLE_BUTTON_WIDTH / 2,
            top: '88px',
            borderColor: borderColorLayoutLines,
            backgroundColor: 'white',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            padding: 0,
            '&:hover': {
              backgroundColor: colorPrimary,
              svg: {
                fill: colorBackground,
              },
            },
          }}
        >
          <ListItemIcon
            sx={{ width: TOGGLE_BUTTON_WIDTH, minWidth: TOGGLE_BUTTON_WIDTH }}
          >
            {icon}
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
    );
  };
};

export function SideBarToggleButton({
  drawerWidth,
  sideBarState,
  onClickCollapse,
  onClickExpand,
}: {
  drawerWidth: number;
  sideBarState: string;
  onClickCollapse: () => void;
  onClickExpand: () => void;
}) {
  const CollapseToggleButton = createToggleButton(<ChevronLeftIcon />);
  const ExpandToggleButton = createToggleButton(<ChevronRightIcon />);

  return (
    <>
      {sideBarState === 'expanded' && (
        <CollapseToggleButton
          title="Collapse"
          onClick={onClickCollapse}
          drawerWidth={drawerWidth}
        />
      )}
      {sideBarState === 'collapsed' && (
        <ExpandToggleButton
          title="Expand"
          onClick={onClickExpand}
          drawerWidth={drawerWidth}
        />
      )}
    </>
  );
}
