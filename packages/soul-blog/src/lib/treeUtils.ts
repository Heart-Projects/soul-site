interface Item {
  id?: number;
  parentId?: number;
  children?: Item[]; // children是可选的，意味着可能没有子节点
}

// 编写一个递归函数来查找目标元素
export function findTreeItem(items: Item[], targetId: number): Item | null {
  for (const item of items) {
    if (item.id === targetId) {
      return item; // 找到目标元素
    }
    // 如果当前元素有子元素，递归查找
    if (item.children) {
      const found = findTreeItem(item.children, targetId);
      if (found) {
        return found; // 递归调用找到目标元素
      }
    }
  }
  return null; // 如果没有找到，返回null
}

export function findSingleTreeItem(item?: Item, targetId: number): Item | null {
  if (!item) {
    return null;
  }
  if (item.children && item.children.length > 0) {
     const found = findTreeItem(item.children, targetId);
      if (found) {
        return found; // 递归调用找到目标元素
      }
  }
  return null; // 如果没有找到，返回null
}

export function findRootById(items: Item[], targetId: number): Item | null {
  for (const item of items) {
    // 递归查找目标节点
    if (item.id === targetId) {
      // 如果找到目标节点，检查其父节点是否是根节点
      if (item.parentId === 0) {
        return item; // 如果 parentId 为 0，直接返回该节点
      } else {
        // 否则递归查找该节点的根元素
        return findRootById(items, item?.parentId|| 0);
      }
    }

    // 如果当前项有子元素，递归查找子树
    if (item.children) {
      const foundRoot = findRootById(item.children, targetId);
      if (foundRoot) {
        return foundRoot;
      }
    }
  }
  return null; // 如果没有找到，返回 null
}