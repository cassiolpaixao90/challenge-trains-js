const LinkedList = require('./linkedList');

class LinkedListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.marked = false;
    this.parent = null;
    this.next = null;
    this.prev = null;
    this.kids = new LinkedList();
  }
}

module.exports = LinkedListNode;
