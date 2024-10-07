export function initializeAddChoreButton() {
    const addChoreButton = document.getElementById('addChoreButton');
    if (addChoreButton) {
        addChoreButton.addEventListener('click', () => {
            window.location.href = 'ParentChoreInputView.html';
        });
    }
}