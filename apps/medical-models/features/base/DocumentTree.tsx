'use client';

import { DocumentNode, LOADED, loading, SimplePageState } from '@mm/types';
import { DrawerSkeleton } from './DrawerSkeleton';
import { NavTreeDocItem } from '@mm/components';
import { DrawerButton } from '@mm/components/server';
import { Add as AddIcon } from '@mui/icons-material';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { getAllNavigation, newDocument } from '@mm/clients';
import { useRouter } from 'next/navigation';

export function DocumentTree() {
  const [drawerMenuState, setDrawerMenuState] =
    useState<SimplePageState>(loading);
  const [navTreeDocs, setNavTreeDocs] = useState<DocumentNode[] | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    async function fetchAllNavigation() {
      const response = await getAllNavigation();
      setNavTreeDocs(response.data);
      setDrawerMenuState(LOADED);
    }

    fetchAllNavigation();
  }, []);

  const clickCreateNewDocument: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      const r = await newDocument();
      router.push('/document/' + r.data.id + '/edit');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {drawerMenuState === loading && <DrawerSkeleton />}
      {drawerMenuState === LOADED &&
        navTreeDocs &&
        navTreeDocs.map((docInfo) => (
          <NavTreeDocItem key={docInfo.id} docInfo={docInfo}></NavTreeDocItem>
        ))}
      <DrawerButton onClick={clickCreateNewDocument} icon={<AddIcon />}>
        Create new document
      </DrawerButton>
    </>
  );
}
