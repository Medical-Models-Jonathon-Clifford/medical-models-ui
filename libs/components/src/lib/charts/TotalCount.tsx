import { Typography } from '@mui/material';

export function TotalCount({
  title,
  total,
}: {
  title: string;
  total: number | string | undefined;
}) {
  return (
    <Typography>
      {`${title}: `}
      <span className="important_text">{total}</span>
    </Typography>
  );
}
