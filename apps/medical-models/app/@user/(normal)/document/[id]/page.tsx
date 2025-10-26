import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { ReadOnlyDocumentName } from '../../../../../features/blocks/document-name/DocumentName';
import { CommentPanel } from '../../../../../features/comments/components/CommentPanel';
import { getDocument } from '@mm/clients';
import { ReadOnlyBody } from './ReadOnlyBody';
import {
  borderColorLayoutLines,
  borderColorLayoutLinesHover,
} from '@mm/tokens';
import { EditOutlined } from '@mui/icons-material';
import { formatTimeSince } from '@mm/utils';

type Document = {
  id: string;
  title: string;
  content: string;
  createdDate: Date;
  modifiedDate: Date;
  body: string;
  creator: string;
  state: string;
  creatorFullName: string;
};

export default async function Page({ params }: { params: { id: string } }) {
  const response = await getDocument(params.id);
  const data: Document = response.data;

  return (
    <>
      <Box
        sx={{
          padding: '16px 0 0 0',
        }}
      >
        <Stack justifyContent={'flex-end'} direction={'row'} spacing={1}>
          <Button
            href={`/document/${params.id}/edit`}
            startIcon={<EditOutlined />}
            variant="outlined"
            sx={{
              color: 'rgba(0, 0, 0, 0.87)',
              textTransform: 'none',
              borderColor: borderColorLayoutLines,
              padding: '4px 12px',
              '&:hover': {
                backgroundColor: 'rgba(202,202,202,0.2)',
                borderColor: borderColorLayoutLinesHover,
              },
            }}
          >
            Edit Page
          </Button>
        </Stack>
        <ReadOnlyDocumentName documentName={data.title}></ReadOnlyDocumentName>
        <Typography variant="subtitle1">
          Created: {formatTimeSince(data.createdDate)} by {data.creatorFullName}{' '}
          - Last modified: {formatTimeSince(data.modifiedDate)}
        </Typography>
        <ReadOnlyBody body={data.body}></ReadOnlyBody>
        <Divider variant="middle" />
        <CommentPanel documentId={params.id}></CommentPanel>
      </Box>
    </>
  );
}
