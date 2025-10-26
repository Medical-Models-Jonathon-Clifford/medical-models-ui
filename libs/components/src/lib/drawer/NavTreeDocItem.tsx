'use client';

import React, { MouseEventHandler, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import { newDocumentWithParent } from '@mm/clients';
import { DocumentNode } from '@mm/types';
import { SquareIconButton } from './SquareIconButton';
import { FolderIcon } from './FolderIcon';
import { colorDrawerButtonHover, colorPrimary } from '@mm/tokens';
import { DocItemButton } from './DocItemButton';
import { LeefIcon } from './LeefIcon';
import { DrawerInner } from './DrawerInner';
import {
  EXTRA_PADDING_PER_LEVEL,
  INITIAL_BUTTON_PADDING,
  MAX_DOC_ITEM_TEXT_WIDTH,
} from './drawer-constants';

export function NavTreeDocItem({
  docInfo,
  level = 0,
}: {
  docInfo: DocumentNode;
  level?: number;
}) {
  const [isFolderOpen, setIsFolderOpen] = useState(true);
  const router = useRouter();
  const params = useParams();

  function isFolder() {
    return docInfo.children.length > 0;
  }

  const href = () => {
    return `/document/${docInfo.id}`;
  };

  const handleFolderOpen = () => {
    setIsFolderOpen(true);
  };

  const handleFolderClose = () => {
    setIsFolderOpen(false);
  };

  const clickAddChild: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await createNewDocument();
  };

  const createNewDocument = async () => {
    try {
      const r = await newDocumentWithParent(docInfo.id);
      router.push('/document/' + r.data.id + '/edit');
    } catch (e) {
      console.log(e);
    }
  };

  function getPaddingLeft() {
    return `${INITIAL_BUTTON_PADDING + level * EXTRA_PADDING_PER_LEVEL}px`;
  }

  function getDocItemTextWidth() {
    return `${MAX_DOC_ITEM_TEXT_WIDTH - level * EXTRA_PADDING_PER_LEVEL}px`;
  }

  const isSelected = () => String(params.id) === docInfo.id;

  const color = isSelected() ? colorPrimary : colorDrawerButtonHover;
  return (
    <>
      <DocItemButton
        isSelected={isSelected}
        paddingLeft={getPaddingLeft()}
        href={href()}
      >
        <DrawerInner>
          {isFolder() ? (
            <FolderIcon
              isOpen={isFolderOpen}
              onOpen={handleFolderOpen}
              onClose={handleFolderClose}
            />
          ) : (
            <LeefIcon />
          )}
          <Box
            sx={{
              boxSizing: 'border-box',
              flex: 'auto',
              width: getDocItemTextWidth(),
            }}
          >
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                margin: 0,
                width: '100%',
                color: color,
              }}
            >
              {docInfo.title}
            </Typography>
          </Box>
        </DrawerInner>
        <Box
          sx={{
            flex: 'none',
          }}
          className="more_actions"
        >
          <SquareIconButton title="New Child" onClick={clickAddChild}>
            <AddIcon />
          </SquareIconButton>
        </Box>
      </DocItemButton>
      {isFolderOpen &&
        docInfo.children.map((childDocInfo: DocumentNode) => {
          return (
            <NavTreeDocItem
              key={childDocInfo.id}
              docInfo={childDocInfo}
              level={level + 1}
            ></NavTreeDocItem>
          );
        })}
    </>
  );
}
