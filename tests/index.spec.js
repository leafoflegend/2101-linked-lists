const { LinkedList, LinkedListNode } = require('../src/index');

describe('LinkedListNode', () => {
    it('Can be assigned a value during construction', () => {
        const node = new LinkedListNode(1);

        expect(node.value).toEqual(1);
    });

    it('Can be given a next node, which correctly places the node next to it', () => {
        const node = new LinkedListNode(1);
        const secondNode = new LinkedListNode(2);

        node.setNext(secondNode);

        expect(node.next.value).toEqual(2);
    });

    it('Can recursively add nodes, placing the next node at the end of the list', () => {
        const node = new LinkedListNode(1);
        const secondNode = new LinkedListNode(2);
        const thirdNode = new LinkedListNode(3);

        node.setNext(secondNode);
        node.setNext(thirdNode);

        expect(
            node.next.next.value
        ).toEqual(3);
    });

    it('Can recursively add nodes, placing the next node at the end of the list', () => {
        const node = new LinkedListNode(1);
        const secondNode = new LinkedListNode(2);
        const thirdNode = new LinkedListNode(3);

        node.setNext(secondNode);
        node.setNext(thirdNode);

        expect(thirdNode.prev.prev.value).toEqual(1);
    });
});


describe('LinkedList', () => {
    let llArr, ll;
    beforeEach(() => {
        llArr = [1, 2, 3];

        ll = new LinkedList(llArr);
    });

    it('Can be constructed with an array, and correctly place a head and a tail', () => {
        expect(ll.head.value).toEqual(1);
        expect(ll.tail.value).toEqual(3);
    });

    it('has a method "forEach" that iterates left to right through the list', () => {
        let idx = 0;

        const testCallback = (node) => {
            expect(node.value).toEqual(llArr[idx]);
            ++idx;
        };

        ll.forEach(testCallback);

        expect(idx).toEqual(llArr.length);
    });

    it('has a "prependToHead" method that adds a node before the head, making it the new head.', () => {
        ll.prependToHead(0);

        expect(ll.head.value).toEqual(0);

        const llTwo = new LinkedList([]);
        llTwo.prependToHead(0);

        expect(llTwo.head.value).toEqual(0);
        expect(llTwo.tail.value).toEqual(0);
    });

    it('has a "appendToTail" method that adds a node after the tail, making it the new tail.', () => {
        ll.appendToTail(4);

        expect(ll.tail.value).toEqual(4);

        const llTwo = new LinkedList([]);
        llTwo.appendToTail(0);

        expect(llTwo.head.value).toEqual(0);
        expect(llTwo.tail.value).toEqual(0);
    });

    it('has nodes with a "remove" method, that correctly update the list if removed in the middle', () => {
        const two = ll.findNode((node) => {
            return node.value === 2;
        });

        two.remove();

        expect(ll.head.value).toEqual(1);
        expect(ll.head.next.value).toEqual(3);
        expect(ll.tail.value).toEqual(3);
    });

    it('has nodes with a "remove" method, that correctly update the list if removed from the head', () => {
        const one = ll.findNode((node) => {
            return node.value === 1;
        });

        one.remove();

        expect(ll.head.value).toEqual(2);
        expect(ll.head.next.value).toEqual(3);
        expect(ll.tail.value).toEqual(3);
    });

    it('has nodes with a "remove" method, that correctly update the list if removed from the tail', () => {
        const three = ll.findNode((node) => {
            return node.value === 3;
        });

        three.remove();

        expect(ll.head.value).toEqual(1);
        expect(ll.head.next.value).toEqual(2);
        expect(ll.tail.value).toEqual(2);
    });
});
