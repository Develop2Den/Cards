export default function findCurrentClass(node, className = 'visit-card',deep = 7) {
    let currentCard = null;
    let parent = node;
    for (let i = 0; i < deep; i++) {
        if (parent.classList.contains(className)) {
            currentCard = parent;
            break;
        }
        parent = parent.parentNode;
    }
    return currentCard;
}