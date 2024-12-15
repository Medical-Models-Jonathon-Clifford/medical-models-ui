import * as React from 'react';
import { useEffect } from 'react';
import { ReadOnlyText } from '../../../components/blocks/text/Text';
import Typography from '@mui/material/Typography';
import { BlockTypes, ValidTypes } from '../../../models/blocks';
import { ReadOnlyDielectric } from '../../../components/blocks/dielectric/DielectricPropsBodyTissues';
import { ViewDrugHalfLife } from '../../../components/blocks/drug-half-life/DrugHalfLife';

type Document = {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  modifiedDate: string;
  body: string;
  creator: string;
  state: string;
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

  const solidParams = await params;
  const id = solidParams.id;

  const response = await fetch(`http://localhost:8081/documents/${id}`);
  const data: Document = await response.json();

  console.log('data');
  console.log(data);


  console.log('solidParams');
  console.log(solidParams);
  console.log('slug');
  console.log(id);

  const Body = ({ body }: { body: string }) => {

    const blocks: BlockTypes[] = JSON.parse(body);
    console.log('blocks');
    console.log(blocks);

    const typedBlocks = blocks.map((block: any) => {
      if (block.type === 'text') {
        return <ReadOnlyText text={block.text}></ReadOnlyText>;
      } else if (block.type === 'dielectric') {
        return <ReadOnlyDielectric tissueName={block.tissue}></ReadOnlyDielectric>;
      } else if (block.type === 'half-life') {
        return <ViewDrugHalfLife drugName={block.drug} dose={block.dose}></ViewDrugHalfLife>
      }
    })

    return (
      <>
        {typedBlocks}
      </>
    );
  };

  return (
    <>
      <Typography variant="h2">{data.title}</Typography>
      <p>Created: {data.createdDate} by User {data.creator} - Last modified: {data.modifiedDate} - {data.state}</p>
      <Body body={data.body}></Body>
    </>
  );
}
