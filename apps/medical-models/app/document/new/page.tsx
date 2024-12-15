'use client';

import * as React from 'react';
import DocumentName from './DocumentName';
import Blocks from './Blocks';
import Divider from '@mui/material/Divider';
import { Comments } from '../../../components/comments/Comments';

export default function NewDocument() {

  return (
    <>
      <p>New Document</p>
      <DocumentName></DocumentName>
      <Blocks></Blocks>
      <Divider sx={{ margin: '16px' }}></Divider>
      <Comments></Comments>
    </>
  );
}
