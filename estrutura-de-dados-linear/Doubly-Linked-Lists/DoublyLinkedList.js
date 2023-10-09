const Node = require('./Node');

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  
  // Create your .addToHead() method below:
  addToHead(data) {
    const newHead = new Node(data);// Criado um novo nó com o dado recebido como argumento.
    const currentHead = this.head;// Criado uma variável para o primeiro item da lista(nó principal ou head)
    if (currentHead) { // Se houver um nó principal na lista
      currentHead.setPreviousNode(newHead);// Definimos o nó anterior dele como o novo nó.
      newHead.setNextNode(currentHead);//e o proximo nó do novo passa a ser o que antes era o primeiro.
    }
    this.head = newHead; // Aqui definimos o primeiro nó da lista como o novo nó.
    if (!this.tail) { // Caso a lista não tenha um último nó, seja uma lista vazia por exemplo.
      this.tail = newHead; // Definimos o último nó como o novo nó também.
    }
  }
  
  addToTail(data) {
    const newTail = new Node(data);
    const currentTail = this.tail;

    if (currentTail) {// caso haja um nó na cauda...
      currentTail.setNextNode(newTail);// Esse que era o último passa a apontar para o novo nó.
      newTail.setPreviousNode(currentTail);// E o novo nó passar a ter o ponteiro anterior para o antigo último. Dessa maneira adicionamos o novo nó no final da lista.
    }
      this.tail = newTail;
      if (!this.head) {
        this.head = newTail;
      }
  }

  removeHead() {
    const removedHead = this.head;
    if (!removedHead) {// Caso removedHead não tenha valor significa que a lista está vazia então o return encerra o método.
      return;
    }
    this.head = removedHead.getNextNode();// A função getNextNode() retornará o nó seguinte do que vamos remover e define ele como o nó principal  da lista a partir daqui.
    if (this.head) {// Caso  o nó principal tenha algum valor, ou seja, a lista não continha apenas o nó que estamos a remover.
      this.head.setPreviousNode(null);// Seu ponteiro para nó anterior passa a ser null pois agora ela é o primeiro da lista.
    } 
    
    if (removedHead === this.tail) { //Caso o nó que removemos seja o único da lista chamamos o metódo removeTail para definirmos a calda como null
      this.removeTail();
    }
    return removedHead.data;
   }

   removeTail(){
    const removedTail = this.tail;
    if (!removedTail) {
      return;
    }
    this.tail = removedTail.getPreviousNode();// O método chamado retorna o nó anterior do nó que estamos removento e torna-o o último nó da lista agora.
    if (this.tail) {// Se this.tail tiver valor o que significa que a lista não tinha apenas um nó...
      this.tail.setNextNode(null);// Definimos seu ponteiro para próximo nó pois agora ele é o último e até aqui ele apontava para o nó que estamos removendo.
    }
    if (removedTail === this.head) { // Caso o nó que estamos removendo seja o único da lista e ele ainda esteja definido como a cabeça da lista o método removeHead irá ajustar this.head para null
      this.removeHead();
    }
    return removedTail.data;
  }

  removeByData(data) {
    let nodeToRemove;
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.data === data) {
        nodeToRemove = currentNode;
        break;
      }
      currentNode = currentNode.getNextNode();
    }
    if (!nodeToRemove) {
      return null;
    }
    // Continue your .removeByData() method below:
    if (nodeToRemove === this.head) {
      this.removeHead();
    } else if (nodeToRemove === this.tail) {
      this.removeTail();
    } else {
      const nextNode = nodeToRemove.getNextNode();
      const previousNode = nodeToRemove.getPreviousNode();
      nextNode.setPreviousNode(previousNode);
      previousNode.setNextNode(nextNode);
    }
    return nodeToRemove;
  }
  
  printList() {
    let currentNode = this.head;
    let output = '<head> ';
    while (currentNode !== null) {
      output += currentNode.data + ' ';
      currentNode = currentNode.getNextNode();
    }
    output += '<tail>';
    console.log(output);
  }
}


module.exports = DoublyLinkedList;
