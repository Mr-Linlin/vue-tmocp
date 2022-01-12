// 使用递归来将数据变换成树形结构，根据parent_id来定义层级结构
export const directoryTree = (data, parentId) => {
    let tree = [];
    if (data !== null && data !== undefined) {
        //    如果他的层级id等于顶级层级的话，那么使用新数组存进去
        data.forEach((item) => {
            // console.log(item);
            if (item.chapterfjid == parentId) {
                tree.push(item);
                directoryTreeChildren(data, item, item.id);
            }
        });
        return tree;
    }
}
//使用递归生成子节点children
const directoryTreeChildren = (data, parentItem, parentId) => {
    parentItem.children = parentItem.children ? parentItem.children : [];
    if (data !== null) {
        data.forEach((item) => {
            if (item.chapterfjid == parentId) {
                parentItem.children.push(item);
                directoryTreeChildren(data, item, item.id);
            }
        });
        return parentItem.children;
    }
}