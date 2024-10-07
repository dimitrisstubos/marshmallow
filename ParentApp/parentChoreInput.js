import { addChore } from '../choreManagement.js';

export function initializeChoreInput() {
    const form = document.getElementById('addChoreForm');
    const backButton = document.getElementById('backButton');

    form.addEventListener('submit', handleFormSubmit);
    backButton.addEventListener('click', () => {
        window.history.back();
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    const choreName = document.getElementById('choreName').value;
    const choreEarnings = parseFloat(document.getElementById('choreEarnings').value);
    const choreFrequency = document.getElementById('choreFrequency').value;
    const defaultIcon = 'fa-broom'; 

    const newChore = {
        name: choreName,
        reward: choreEarnings,
        icon: defaultIcon,
        frequency: choreFrequency,
        status: "To Do"
    };

    addChore(newChore);

    alert('Chore added successfully!');
    window.location.href = 'ParentChoreView.html';
}
