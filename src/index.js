class LinkedListNode {
    constructor(value, linkedList) {
        this.value = value;
        this.next = null;
        this.prev = null;
        this.linkedList = linkedList;
    }

    setNext(node) {
        if (!this.next) {
            this.next = node;
            node.prev = this;
        } else {
            this.next.setNext(node);
        }
    }

    setPrev(node) {
        if (!this.prev) {
            this.prev = node;
            node.next = this;
        } else {
            this.prev.setPrev(node);
        }
    }

    remove() {
        if (this.next && this.prev) {
            this.prev.next = this.next;
            this.next.prev = this.prev;
        } else if (this.prev && !this.next) {
            this.prev.next = null;
            this.linkedList.tail = this.prev;
        } else if (!this.prev && this.next) {
            this.next.prev = null;
            this.linkedList.head = this.next;
        } else {
            this.linkedList.head = null;
            this.linkedList.tail = null;
        }

        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor(arr) {
        this.head = null;
        this.tail = null;

        for (const el of arr) {
            const node = new LinkedListNode(el, this);

            if (this.tail) {
                this.tail.setNext(node);
                this.tail = node;
            }

            if (!this.head) {
                this.head = node;
            }

            if (!this.tail) {
                this.tail = node;
            }
        }
    }

    forEach(cb) {
        let currentNode = this.head;

        while (currentNode) {
            cb(currentNode);
            currentNode = currentNode.next;
        }
    }

    appendToTail(value) {
        const node = new LinkedListNode(value);

        if (this.tail) {
            this.tail.setNext(node);
            this.tail = node;
        } else {
            this.tail = node;
            this.head = node;
        }
    }

    prependToHead(value) {
        const node = new LinkedListNode(value);

        if (this.head) {
            this.head.setPrev(node);
            this.head = node;
        } else {
            this.tail = node;
            this.head = node;
        }
    }

    findNode(selector) {
        let currentNode = this.head;

        while (currentNode) {
            const result = selector(currentNode);

            if (result) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }
}

module.exports = {
    LinkedList,
    LinkedListNode,
};
