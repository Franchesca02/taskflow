// Helper function for reordering items in an array
export function reorder<T>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

// Helper for moving items between lists
export function move<T>(
  source: T[],
  destination: T[],
  droppableSource: { index: number },
  droppableDestination: { index: number }
): { source: T[]; destination: T[] } {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  return {
    source: sourceClone,
    destination: destClone,
  }
}