const LinkedList = require('./linkedList');
const LinkedListNode = require('./linkedListNode');

class PriorityQueue {
  constructor() {
    this.roots = new LinkedList();
    this.min = null;
    this.valueMap = {};
    this.node = null;
    this.warned = false;
  }

  // Makes root one node the parent of a former root node
  addChild(parentNode, childNode) {
    this.roots.remove(childNode);
    childNode.parent = parentNode;
    parentNode.kids.add(childNode);
  }

  // Makes one node a root node
  makeRoot(node) {
    if (node.parent != null) {
      node.parent.kids.remove(node);
      node.parent = null;
    }
    this.roots.add(node);
    node.marked = false;
  }

  add(key, value) {
    if (typeof key !== 'number') {
      throw new TypeError('Key must be a number');
    }

    this.node = new LinkedListNode(key, value);

    this.makeRoot(this.node);

    if (this.min == null || this.node.key < this.min.key) {
      this.min = this.node;
    }
    // Add to valueMap
    const mappedNode = this.valueMap[value];
    if (mappedNode != null && mappedNode.value !== value) {
      if (!this.warned) {
        console.log('distinct values');
        this.warned = true;
      }
      if (Array.isArray(mappedNode)) {
        mappedNode.push(this.node);
      } else {
        this.valueMap[value] = [mappedNode, this.node];
      }
    } else {
      this.valueMap[value] = this.node;
    }
  }

  extractMin() {
    if (this.min == null) {
      return null;
    }

    // Remove node
    const oldMin = this.min;

    this.roots.remove(oldMin);

    oldMin.kids.toArray(node => this.makeRoot(node));

    if (this.roots.length == 0) {
      this.min = null;
      this.valueMap = {};
    } else {
      this.min = null;

      // Update value map
      if (Array.isArray(this.valueMap[oldMin.value])) {
        const mappedArray = this.valueMap[oldMin.value];

        const index = mappedArray.map(item => item.value).indexOf(oldMin.value);

        if (index != -1) {
          mappedArray.splice(i, 1);
          if (mappedArray.length == 1) {
            this.valueMap[oldMin.value] = mappedArray[0];
          }
        }
      } else {
        delete this.valueMap[oldMin.value];
      }

      // Join trees until each root node has a different degree.
      const rootWithDegree = [];

      this.roots.toArray((root) => {
        while (rootWithDegree[root.kids.length] != null) {
          const ret = rootWithDegree[root.kids.length];
          delete rootWithDegree[root.kids.length];

          if (ret.key < root.key) {
            this.addChild(ret, root);
            root = ret;
          } else {
            this.addChild(root, ret);
          }
        }
        rootWithDegree[root.kids.length] = root;
      });

      // Find the new minimum
      this.roots.toArray((root) => {
        if (this.min == null || root.key < this.min.key) {
          this.min = root;
        }
      });
    }
    return { key: oldMin.key, value: oldMin.value };
  }

  decreaseKey(value, key) {
    const node = this.valueMap[value];

    if (Array.isArray(node)) {
      node = node.filter(item => item.value === value)[0];
    }

    if (node == null) {
      throw new Error('Value not in heap');
    }

    if (node.key <= key) {
      return false;
    }

    node.key = key;
    if (key < this.min.key) {
      this.min = node;
    }

    if (node.parent != null && node.key < node.parent.key) {
      do {
        const parentNode = node.parent;
        this.makeRoot(node);
        node = parentNode;
      } while (node.marked);
      if (node.parent != null) {
        node.marked = true;
      }
    }

    return true;
  }
}

module.exports = PriorityQueue;
