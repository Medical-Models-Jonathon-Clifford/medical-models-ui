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
import { useRouter } from 'next/navigation';
import axios from 'axios';

export type DocumentNode = {
  id: string;
  title: string;
  createdDate: Date;
  modifiedDate: Date;
  childDocs: DocumentNode[];
}

export function NavTreeDocItem({ docInfo }: {
  docInfo: DocumentNode
}) {
  const [folderOpen, setFolderOpen] = React.useState(true);
  const router = useRouter();

  function isFolder() {
    return docInfo.childDocs.length > 0;
  }

  const href = () => {
    return `/document/${docInfo.id}`;
  };

  const openFolderArrowClicked: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFolderOpen(true);
  };

  const closeFolderArrowClicked: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFolderOpen(false);
  };

  const clickAddChild: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('clicked add child')
    createNewDocument();
  };

  const createNewDocument = () => {
    console.log('Clicked create new document');
    axios.post(`http://localhost:8081/documents/new?parentId=${docInfo.id}`)
      .then(r => {
        console.log(r.data);
        router.push('/document/' + r.data.id + '/edit');
      })
      .catch(e => {
        console.log(e);
      });
  }

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
            <IconButton onClick={closeFolderArrowClicked}>
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
          {isFolder() && !folderOpen && (
            <IconButton onClick={openFolderArrowClicked}>
              <KeyboardArrowRightIcon />
            </IconButton>
          )}
          <Typography variant="body1">{docInfo.title}</Typography>
          <IconButton onClick={() => console.log('clicked')}>
            <MoreHorizIcon />
          </IconButton>
          <IconButton onClick={clickAddChild}>
            <AddIcon />
          </IconButton>
        </Button>
      </Box>
      {folderOpen && docInfo.childDocs.map((docInfo: DocumentNode) => {
        return (
          <Box key={docInfo.id} sx={{ marginLeft: '12px' }}>
            <NavTreeDocItem docInfo={docInfo}></NavTreeDocItem>
          </Box>
        );
      })}
    </>

  );
}
