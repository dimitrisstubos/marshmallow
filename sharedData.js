// Shared data
const defaultTransactions = [
    {type: 'earned', description: 'Earned', subtitle: 'Made their bed', amount: 2.00, icon: 'fa-plus-circle'},
    {type: 'received', description: 'Received', subtitle: 'Weekly allowance', amount: 8.00, icon: 'fa-plus-circle'},
    {type: 'spent', description: 'Spent', subtitle: 'Internet purchase', amount: -15.00, icon: 'fa-minus-circle'},
    {type: 'saved', description: 'Saved', subtitle: 'Transfer to Savings', amount: -10.00, icon: 'fa-piggy-bank'},
    {type: 'swapped', description: 'Swapped', subtitle: 'Swapped USDC to SOL', amount: 5.00, icon: 'fa-exchange-alt'}
];

const defaultData = {
    child: {
        spendingBalance: 31.20,
        savingsBalance: 20.22,
        rewardsBalance: 1.04,
    },
    chores: [
        { name: "Clean your room", reward: 1.00, icon: "fa-broom", frequency: "Daily", status: "To Do" },
        { name: "Take out the trash", reward: 0.50, icon: "fa-trash", frequency: "Weekly", status: "To Be Approved" },
        { name: "Do the dishes", reward: 2.00, icon: "fa-sink", frequency: "Daily", status: "Approved" }
    ]
};

// Load data from localStorage or use default
let sharedData = JSON.parse(localStorage.getItem('sharedData')) || defaultData;
let transactions = JSON.parse(localStorage.getItem('transactions')) || defaultTransactions;

// Shared functions
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
    saveData();
}

function saveData() {
    localStorage.setItem('sharedData', JSON.stringify(sharedData));
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Export shared data and functions
export { sharedData, transactions, calculateTotalBalance, updateChoreStatus, addChore, removeChore, addTransaction, saveData };