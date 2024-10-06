import { defaultTransactions, defaultData } from './sampleData.js';

// Load data from localStorage or use default
let sharedData = JSON.parse(localStorage.getItem('sharedData')) || defaultData;
let transactions = JSON.parse(localStorage.getItem('transactions')) || defaultTransactions;

function calculateBalances() {
    let spendingBalance = 0;
    let savingsBalance = 0;
    let rewardsBalance = 0;

    transactions.forEach(transaction => {
        switch (transaction.type) {
            case 'earned':
            case 'received':
                spendingBalance += transaction.amount;
                break;
            case 'spent':
                spendingBalance += transaction.amount; // amount is negative for spent
                break;
            case 'saved':
                spendingBalance += transaction.amount; // amount is negative for saved
                savingsBalance -= transaction.amount; // add to savings
                break;
            case 'swapped':
                // Assuming swaps don't affect overall balance
                break;
            case 'reward':
                rewardsBalance += transaction.amount;
                break;
        }
    });

    sharedData.child.spendingBalance = spendingBalance;
    sharedData.child.savingsBalance = savingsBalance;
    sharedData.child.rewardsBalance = rewardsBalance;
}

function calculateTotalBalance(child) {
    return child.spendingBalance + child.savingsBalance;
}

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

function addTransaction(transaction) {
    transactions.unshift(transaction);
    calculateBalances();
    saveData();
}

function saveData() {
    localStorage.setItem('sharedData', JSON.stringify(sharedData));
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Calculate balances on initial load
calculateBalances();

export { sharedData, transactions, calculateTotalBalance, updateChoreStatus, addChore, removeChore, addTransaction, saveData };