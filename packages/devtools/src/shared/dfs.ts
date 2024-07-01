interface DfsNode {
  id: number;
  children?: DfsNode[];
}

export function dfs<T extends DfsNode> (graph: T[], id: number): T | undefined {
  const stack: T[] = []
  for (const node of graph) {
    stack.push(node)
  }

  while (stack.length > 0) {
    const currentNode = stack.pop()
    if (!currentNode) continue

    if (currentNode.id === id) {
      return currentNode
    }
    if (currentNode.children) {
      for (const child of currentNode.children) {
        stack.push(child as T) // push child as T to satisfy the stack type
      }
    }
  }

  return undefined
}
