import { CommentNode } from '@mm/types';
import { compareComments, countComments, deleteCommentNode } from './comments';
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

    it('should return 0 for empty comments array', () => {
      expect(countComments([])).toBe(0);
    });

    it('should count nested comments correctly', () => {
      const childComment = newTestCommentNode();
      const parentComment = new CommentNodeBuilder()
        .id('parent')
        .children([childComment])
        .build();
      const testCommentNodes: CommentNode[] = [parentComment];

      expect(countComments(testCommentNodes)).toBe(2);
    });

    it('should count multiple comments at same level', () => {
      const testCommentNodes: CommentNode[] = [
        newTestCommentNode(),
        newTestCommentNode(),
        newTestCommentNode(),
      ];

      expect(countComments(testCommentNodes)).toBe(3);
    });

    it('should count complex nested structure correctly', () => {
      const leaf1 = newTestCommentNode();
      const leaf2 = newTestCommentNode();
      const middleNode = new CommentNodeBuilder()
        .id('middle')
        .children([leaf1, leaf2])
        .build();
      const rootNode = new CommentNodeBuilder()
        .id('root')
        .children([middleNode])
        .build();
      const testCommentNodes: CommentNode[] = [rootNode];

      expect(countComments(testCommentNodes)).toBe(4);
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

    it('should return unchanged array when deleting non-existent node', () => {
      const existingNode = newTestCommentNode();
      const nonExistentNode = newTestCommentNode();
      const testCommentNodes: CommentNode[] = [existingNode];

      const result = deleteCommentNode(nonExistentNode, testCommentNodes);

      expect(result).toEqual(testCommentNodes);
    });

    it('should delete node from deep nested structure', () => {
      const targetNode = newTestCommentNode();
      const leaf = newTestCommentNode();
      const level2Node = new CommentNodeBuilder()
        .id('level2')
        .children([targetNode, leaf])
        .build();
      const rootNode = new CommentNodeBuilder()
        .id('root')
        .children([level2Node])
        .build();
      const testCommentNodes: CommentNode[] = [rootNode];

      const result = deleteCommentNode(targetNode, testCommentNodes);

      expect(result[0].children[0].children).toHaveLength(1);
      expect(result[0].children[0].children[0]).toBe(leaf);
    });

    it('should delete parent node with all its children', () => {
      const child1 = newTestCommentNode();
      const child2 = newTestCommentNode();
      const parentNode = new CommentNodeBuilder()
        .id('parent')
        .children([child1, child2])
        .build();
      const testCommentNodes: CommentNode[] = [parentNode];

      const result = deleteCommentNode(parentNode, testCommentNodes);

      expect(result).toHaveLength(0);
    });
  });
});
