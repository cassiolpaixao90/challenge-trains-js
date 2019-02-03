class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  add(node) {
    if (this.length == 0) {
      this.head = node;
      node.next = node;
      node.prev = node;
    } else {
      node.next = this.head.next;
      node.prev = this.head;
      this.head.next.prev = node;
      this.head.next = node;
    }
    this.length++;
    return this;
  }

  remove(node) {
    if (this.length == 1) this.head = null;
    else {
      node.next.prev = node.prev;
      node.prev.next = node.next;
      if (this.head == node) this.head = node.next;
    }
    node.next = node.prev = node;
    this.length--;
    return this;
  }

  toArray(callback) {
    const nodes = [];
    let node = this.head;
    if (node != null) {
      do {
        nodes.push(node);
        node = node.next;
      } while (node != this.head);
    }
    nodes.forEach(callback);
  }
}

module.exports = LinkedList;
