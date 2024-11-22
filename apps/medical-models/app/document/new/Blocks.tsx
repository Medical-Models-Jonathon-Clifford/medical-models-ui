import Block from './Block';
import * as React from 'react';

type BlockData = {
  index: number;
};

export default function Blocks() {
  const [blocks, setBlocks] = React.useState([{ index: 1 }]);

  const clickNewBlock = () => {
    setBlocks((prev) => {
      const newIndex = prev[prev.length - 1].index + 1;
      return prev.concat({ index: newIndex });
    });
  };

  return (
    <>
      {blocks.map((block: BlockData) => {
        return <Block key={block.index} clickNewBlock={clickNewBlock}></Block>;
      })}
    </>
  );
}
