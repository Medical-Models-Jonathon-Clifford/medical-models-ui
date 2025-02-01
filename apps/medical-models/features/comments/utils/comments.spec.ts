import { CommentNode, countComments } from './comments';

describe('Comment Utils', () => {
  describe('countComments', () => {
    it('should render successfully', () => {
      const testCommentNodes: CommentNode[] = [
        {
          comment: {
            id: '1',
            document_id: '10',
            body: 'Test comment',
            createdDate: new Date(Date.parse('04 Mar 2010 00:12:00 GMT')),
            modifiedDate: new Date(Date.parse('04 Mar 2010 00:12:02 GMT')),
          },
          children: [],
        },
      ];

      const count = countComments(testCommentNodes);

      expect(count).toBe(1);
    });
  });
});
