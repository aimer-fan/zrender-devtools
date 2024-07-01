type Node = {
  id: number;
  parent?: Node;
}
export function getNodeChain (node: Node) {
  let p = node
  const rst: number[] = []

  while (p) {
    rst.push(p.id)
    p = p.parent
  }
  return rst
}
