import { MouseEventHandler } from 'react';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@mui/icons-material';
import { SquareIconButton } from '../square-icon-button/SquareIconButton';

export const FolderIcon = ({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const openFolderArrowClicked: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
    onOpen();
  };

  const closeFolderArrowClicked: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };

  if (isOpen) {
    return (
      <SquareIconButton onClick={closeFolderArrowClicked}>
        <KeyboardArrowDownIcon />
      </SquareIconButton>
    );
  }

  return (
    <SquareIconButton onClick={openFolderArrowClicked}>
      <KeyboardArrowRightIcon />
    </SquareIconButton>
  );
};
