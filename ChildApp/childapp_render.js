import { sharedData, transactions, calculateTotalBalance } from '../financialOperations.js';
import { updateDial } from './child_dial.js';

export function updateDashboard() {
    const child = sharedData.child;
    child.totalBalance = calculateTotalBalance(child);
    
    document.getElementById('totalBalance').textContent = child.totalBalance.toFixed(2);
    document.getElementById('spendingBalance').textContent = child.spendingBalance.toFixed(2);
    document.getElementById('savingsBalance').textContent = child.savingsBalance.toFixed(2);
    document.getElementById('rewardsBalance').textContent = child.rewardsBalance.toFixed(2);
}

export function updateSummary() {
    let leftToEarn = 0;
    let toDo = 0;
    let earned = 0;
    let totalChores = sharedData.chores.length;

    sharedData.chores.forEach(chore => {
        if (chore.status === "To Do") {
            leftToEarn += chore.reward;
            toDo++;
        } else if (chore.status === "Approved") {
            earned += chore.reward;
        }
    });

    const completedChores = totalChores - toDo;
    const completionPercentage = (completedChores / totalChores) * 100;

    document.getElementById('leftToEarn').textContent = `$${leftToEarn.toFixed(2)}`;
    document.getElementById('toDo').textContent = `${completedChores}/${totalChores}`;
    document.getElementById('earned').textContent = `$${earned.toFixed(2)}`;

    updateDial(completionPercentage);
}

export function renderChores(filter = 'all') {
    const choreList = document.getElementById('chore-list');
    if (!choreList) return;

    choreList.innerHTML = '';
    sharedData.chores.forEach(chore => {
        if (filter === 'all' || chore.status.toLowerCase().replace(/\s+/g, '-') === filter) {
            const choreItem = document.createElement('div');
            choreItem.className = 'chore-item';
            choreItem.innerHTML = `
                <div class="chore-left">
                    <i class="fas ${chore.icon} chore-icon"></i>
                    <div class="chore-text">
                        <span class="chore-name">${chore.name}</span>
                        <span class="chore-frequency">${chore.frequency}</span>
                    </div>
                </div>
                <div class="chore-right">
                    <span class="chore-status ${chore.status.toLowerCase().replace(/\s+/g, '-')}">${chore.status}</span>
                    <span class="chore-reward">$${chore.reward.toFixed(2)}</span>
                    ${chore.status === "To Do" ? '<button class="request-approval-button">Request Approval</button>' : ''}
                </div>
            `;
            choreList.appendChild(choreItem);
        }
    });
    updateSummary();
}

export function renderTransactions() {
    const transactionList = document.getElementById('transaction-list');
    if (!transactionList) return;

    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.datetime);
        const formattedDate = transactionDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        const formattedTime = transactionDate.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
        });

        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item flex justify-between items-center p-2 border-b';
        transactionItem.innerHTML = `
            <div class="transaction-info flex items-center">
                <i class="fas ${transaction.icon} mr-2"></i>
                <div>
                    <div class="transaction-description font-semibold">${transaction.description}</div>
                    <div class="transaction-subtitle text-sm text-gray-600">${transaction.subtitle}</div>
                    <div class="transaction-datetime text-xs text-gray-500">${formattedDate} at ${formattedTime}</div>
                </div>
            </div>
            <div class="transaction-amount ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}">
                $${Math.abs(transaction.amount).toFixed(2)}
            </div>
        `;
        transactionList.appendChild(transactionItem);
    });
}