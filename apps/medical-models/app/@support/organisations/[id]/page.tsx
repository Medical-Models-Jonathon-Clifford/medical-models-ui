import * as React from 'react';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <h2>Organisation: {params.id}</h2>
      <p>Name: </p>
      <input type="test" value="Current name"/>
    </>
  );
}
