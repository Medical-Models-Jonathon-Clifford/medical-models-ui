'use client';

import React, { MouseEventHandler, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Add as AddIcon, Circle as CircleIcon } from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import { newDocumentWithParent } from '../../client/document-client';
import { DocumentNode } from '../../types/document';
import { SquareIconButton } from '../square-icon-button/SquareIconButton';
import { FolderIcon } from '../folder-icon/FolderIcon';
import styles from './NavTreeDocItem.module.scss';

const INITIAL_BUTTON_PADDING = 8;
const EXTRA_PADDING_PER_LEVEL = 15;
const MAX_DOC_ITEM_TEXT_WIDTH = 204;

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

  const docId = String(params.id);

  const DocItemButton = ({ children }: { children: React.ReactNode }) => {
    return (
      <Button
        className={styles.nav_tree_doc_item_button}
        sx={{
          paddingLeft: getPaddingLeft(),
          backgroundColor:
            docId === docInfo.id ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
          ':hover': {
            backgroundColor:
              docId === docInfo.id
                ? 'rgba(25, 118, 210, 0.2)'
                : 'rgba(202,202,202,0.2)',
          },
        }}
        href={href()}
      >
        {children}
      </Button>
    );
  };

  function getDocItemTextWidth() {
    return `${MAX_DOC_ITEM_TEXT_WIDTH - level * EXTRA_PADDING_PER_LEVEL}px`;
  }

  const LeefIcon = () => {
    return (
      <Box className={styles.nav_tree_doc_item_leef_box}>
        <CircleIcon className={styles.nav_tree_doc_item_circle_icon} />
      </Box>
    );
  };

  return (
    <>
      <Box className={styles.nav_tree_doc_item_box}>
        <DocItemButton>
          <Box className={styles.nav_tree_doc_item_icon_text_box}>
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
              sx={{ width: getDocItemTextWidth() }}
              className={styles.nav_tree_doc_item_text_box}
            >
              <Typography
                variant="body1"
                className={styles.nav_tree_doc_item_text}
                sx={{
                  color:
                    docId === docInfo.id
                      ? 'rgba(25, 118, 210, 1)'
                      : 'rgba(0, 0, 0, 0.87)',
                }}
              >
                {docInfo.title}
              </Typography>
            </Box>
          </Box>
          <Box
            className={`more_actions ${styles.nav_tree_doc_item_options_box}`}
          >
            <SquareIconButton title="New Child" onClick={clickAddChild}>
              <AddIcon />
            </SquareIconButton>
          </Box>
        </DocItemButton>
      </Box>
      {isFolderOpen &&
        docInfo.children.map((childDocInfo: DocumentNode) => {
          return (
            <Box key={childDocInfo.id}>
              <NavTreeDocItem
                docInfo={childDocInfo}
                level={level + 1}
              ></NavTreeDocItem>
            </Box>
          );
        })}
    </>
  );
}
