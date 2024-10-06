import { sharedData, saveData } from './financialOperations.js';

function updateChoreStatus(choreName, newStatus) {
    const chore = sharedData.chores.find(c => c.name === choreName);
    if (chore) {
        chore.status = newStatus;
        saveData();
    }
}

function addChore(chore) {
    sharedData.chores.push(chore);
    saveData();
}

function removeChore(choreName) {
    const index = sharedData.chores.findIndex(c => c.name === choreName);
    if (index !== -1) {
        sharedData.chores.splice(index, 1);
        saveData();
    }
}

export { updateChoreStatus, addChore, removeChore };