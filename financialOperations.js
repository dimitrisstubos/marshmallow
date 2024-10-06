import { transactionHistory, defaultData } from './sampleData.js';

let sharedData = JSON.parse(localStorage.getItem('sharedData')) || defaultData;
let transactions = JSON.parse(localStorage.getItem('transactions')) || transactionHistory;

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
                spendingBalance += transaction.amount;
                break;
            case 'saved':
                spendingBalance += transaction.amount;
                savingsBalance -= transaction.amount;
                break;
            case 'swapped':
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

function addTransaction(transaction) {
    transactions.unshift(transaction);
    calculateBalances();
    saveData();
}

function saveData() {
    localStorage.setItem('sharedData', JSON.stringify(sharedData));
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

calculateBalances();

export { sharedData, transactions, calculateTotalBalance, addTransaction, saveData };