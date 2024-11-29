import * as React from 'react';
import { useEffect } from 'react';

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

export default async function Page({params}: {params: Promise<{ id: string }>}) {

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

  return (
    <>
      <p>Document Id: {id}</p>
      <p>{data.id}</p>
      <p>{data.title}</p>
      <p>{data.createdDate}</p>
      <p>{data.modifiedDate}</p>
      <p>{data.body}</p>
      <p>{data.creator}</p>
      <p>{data.state}</p>
    </>
  );
}
