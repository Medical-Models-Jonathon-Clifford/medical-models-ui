import {
  CommentNode,
  compareComments,
  countComments,
  deleteCommentNode,
} from './comments';
import {
  CommentNodeBuilder,
  newTestCommentNode,
} from '../../../testing/data-generator';

describe('Comment Utils', () => {
  describe('countComments', () => {
    it('should count a single comment as 1', () => {
      const testCommentNodes: CommentNode[] = [newTestCommentNode()];

      const count = countComments(testCommentNodes);

      expect(count).toBe(1);
    });
  });

  describe('compareComments', () => {
    it('should return 0 when given the same comment twice', () => {
      const testCommentNode: CommentNode = newTestCommentNode();

      const count = compareComments(testCommentNode, testCommentNode);

      expect(count).toBe(0);
    });

    it('should return 1 when given first comment is after the second', () => {
      const testCommentNode1 = newTestCommentNode('04 Mar 2010 00:13:00 GMT');
      const testCommentNode2 = newTestCommentNode('04 Mar 2010 00:12:00 GMT');

      const count = compareComments(testCommentNode1, testCommentNode2);

      expect(count).toBe(1);
    });

    it('should return -1 when given first comment is before the second', () => {
      const testCommentNode1 = newTestCommentNode('04 Mar 2010 00:12:00 GMT');
      const testCommentNode2 = newTestCommentNode('04 Mar 2010 00:13:00 GMT');

      const count = compareComments(testCommentNode1, testCommentNode2);

      expect(count).toBe(-1);
    });
  });

  describe('deleteCommentNode', () => {
    it('should delete single node in tree', () => {
      const testCommentNode = newTestCommentNode();
      const testCommentNodes: CommentNode[] = [testCommentNode];

      const remainingNodes = deleteCommentNode(
        testCommentNode,
        testCommentNodes
      );

      expect(remainingNodes.length).toBe(0);
    });
    it('should delete leaf node in a path tree of depth 2', () => {
      const childCommentNode = newTestCommentNode();
      const parentCommentNode = new CommentNodeBuilder()
        .id('2')
        .children([childCommentNode])
        .build();
      const testCommentNodes: CommentNode[] = [parentCommentNode];

      const remainingNodes = deleteCommentNode(
        childCommentNode,
        testCommentNodes
      );

      expect(remainingNodes.length).toBe(1);
    });
  });
});
