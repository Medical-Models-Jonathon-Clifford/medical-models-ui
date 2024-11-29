import * as React from 'react';
import { MouseEventHandler } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';

export type NavTreeDocInfo = {
  id: string;
  title: string;
  createdDate: Date;
  modifiedDate: Date;
}

export type DocumentNode = {
  document: NavTreeDocInfo;
  childDocs: DocumentNode[];
}

export function NavTreeDocItem({ docInfo }: {
  docInfo: DocumentNode
}) {
  const [folderOpen, setFolderOpen] = React.useState(true);

  function isFolder() {
    return docInfo.childDocs.length > 0;
  }

  const href = () => {
    return `/document/${docInfo.document.id}`;
  };

  const openFolderArrowClicked: MouseEventHandler<HTMLButtonElement> = (event) => {
    setFolderOpen(true);
    event.preventDefault();
  };

  return (
    <>
      <Box>
        <Button href={href()}>
          {!isFolder() &&
            <IconButton onClick={() => console.log('clicked')}>
              <FiberManualRecordIcon />
            </IconButton>
          }
          {isFolder() && folderOpen && (
            <IconButton onClick={() => console.log('clicked')}>
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
          {isFolder() && !folderOpen && (
            <IconButton onClick={openFolderArrowClicked}>
              <KeyboardArrowRightIcon />
            </IconButton>
          )}
          <Typography variant="body1">{docInfo.document.title}</Typography>
          <IconButton onClick={() => console.log('clicked')}>
            <MoreHorizIcon />
          </IconButton>
          <IconButton onClick={() => console.log('clicked')}>
            <AddIcon />
          </IconButton>
        </Button>
      </Box>
      {folderOpen && docInfo.childDocs.map((docInfo: DocumentNode) => {
        return (
          <Box key={docInfo.document.id} sx={{ marginLeft: '12px' }}>
            <NavTreeDocItem docInfo={docInfo}></NavTreeDocItem>
          </Box>
        );
      })}
    </>

  );
}
