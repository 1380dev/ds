type Node<T> = {
  next: Node<T> | null;
  value: T;
};

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private size = 0;

  constructor(value?: T | T[]) {
    if (!value) {
      return this;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        this.addToEnd(item);
      });
      return this;
    }

    this.head = {
      value,
      next: null,
    };
    this.tail = this.head;
    this.size++;
  }

  static from<T>(iterableValue: Iterable<T>): LinkedList<T> {
    const list = new LinkedList<T>();
    for (const value of iterableValue) {
      list.push(value);
    }

    return list;
  }

  push(value: T): LinkedList<T> {
    this.addToEnd(value);
    return this;
  }

  pop(): T {
    if (this.head === null) {
      throw Error("Can't use pop! List is empty!");
    }

    const node = this.secondLastNode();

    if (node === null) {
      const result = this.head.value;

      this.head = null;
      this.tail = null;
      this.size--;

      return result;
    }

    const result = (this.tail as Node<T>).value as T;
    node.next = null;

    this.tail = node;
    this.size--;

    return result;
  }

  unshift(value: T): LinkedList<T> {
    this.addToFront(value);
    return this;
  }

  shift(): T {
    if (this.head === null) {
      throw Error("Can't use shift! List is empty!");
    }

    const result = this.head.value;

    if (this.head.next) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }

    this.size--;

    return result;
  }

  get length(): number {
    return this.size;
  }

  fist(): T | null {
    return this.head?.value ?? null;
  }

  last(): T | null {
    return this.tail?.value ?? null;
  }

  at(index: number): T {
    let i = 0;
    let node = this.head;

    while (i < index && node) {
      node = node.next;

      i++;
    }

    if (node === null) {
      throw Error(`Linked list have no item with index ${index}`);
    }

    return node.value;
  }

  clear(): LinkedList<T> {
    let node = this.head;

    while (node) {
      const temp: Partial<Node<T>> = node;
      node = node.next;

      delete temp.next;
      delete temp.value;
    }

    this.size = 0;

    return this;
  }

  isEmpy(): boolean {
    return this.size === 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    let node = this.head;

    while (node) {
      result.push(node.value);
      node = node.next;
    }

    return result;
  }

  forEach(cb: (element: T, index: number) => void): LinkedList<T> {
    let i = 0;
    let node = this.head;

    while (node) {
      cb(node.value, i);
      node = node.next;
      i++;
    }

    return this;
  }

  map(cb: (element: T, index: number) => T): LinkedList<T> {
    let i = 0;
    let node = this.head;

    const list = new LinkedList<T>();

    while (node) {
      const value = cb(node.value, i);

      list.push(value);
      node = node.next;
      i++;
    }

    return list;
  }

  reduce<K>(cb: (acc: K, element: T, index: number) => K, initialValue: K): K {
    let acc = initialValue;
    let i = 0;
    let node = this.head;

    while (node) {
      acc = cb(acc, node.value, i);

      node = node.next;
      i++;
    }

    return acc;
  }

  search(value: T): number {
    let index = 0;
    let node = this.head;

    while (node && node.value !== value) {
      node = node.next;
      index++;
    }

    return index;
  }

  private addToEnd(item: T): void {
    if (this.tail === null) {
      this.head = {
        value: item,
        next: null,
      };

      this.tail = this.head;
    } else {
      this.tail.next = {
        value: item,
        next: null,
      };

      this.tail = this.tail.next;
    }

    this.size++;
  }

  private addToFront(item: T): void {
    if (this.tail === null) {
      this.head = { value: item, next: null };
      this.tail = this.head;
    } else {
      const node = {
        value: item,
        next: this.head,
      };

      this.head = node;
    }
    this.size++;
  }

  private secondLastNode(): Node<T> | null {
    let currentNode = this.head;

    if (currentNode === null || currentNode.next === null) {
      return null;
    }

    while (currentNode && currentNode.next !== this.tail) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  *[Symbol.iterator]() {
    let node = this.head;

    while (node) {
      yield node.value;
      node = node.next;
    }
  }
}
