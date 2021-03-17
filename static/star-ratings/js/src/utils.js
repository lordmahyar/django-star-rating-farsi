function hasClass(el, name) {
    return (" " + el.className + " ").indexOf(" " + name + " ") > -1;
}
function findParent(el, className) {
    var parentNode = el.parentNode;
    while (hasClass(parentNode, className) === false) {
        if (parentNode.parentNode === undefined) {
            return null;
        }
        parentNode = parentNode.parentNode;
    }
    return parentNode;
}
module.exports = { hasClass: hasClass, findParent: findParent };
