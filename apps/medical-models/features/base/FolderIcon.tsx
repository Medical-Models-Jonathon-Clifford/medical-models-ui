import { MouseEventHandler } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { SquareIconButton } from '../../components/square-icon-button/SquareIconButton';

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
