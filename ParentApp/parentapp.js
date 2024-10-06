import { sharedData, calculateTotalBalance, updateChoreStatus } from '../sharedData.js';

function updateDashboard() {
    const child = sharedData.child;
    child.totalBalance = calculateTotalBalance(child);
    
    document.getElementById('totalBalance').textContent = child.totalBalance.toFixed(2);
    document.getElementById('spendingBalance').textContent = child.spendingBalance.toFixed(2);
    document.getElementById('savingsBalance').textContent = child.savingsBalance.toFixed(2);
    
    renderTransactions();
}

function renderTransactions() {
    const transactionList = document.getElementById('transactionList');
    if (!transactionList) return;

    transactionList.innerHTML = '';
    sharedData.child.transactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        transactionItem.innerHTML = `
            <div class="transaction-left">
                <i class="fas ${transaction.icon} transaction-icon ${transaction.type === 'swapped' ? 'swap-icon' : ''}"></i>
                <div class="transaction-text">
                    <span class="transaction-description">${transaction.description}</span>
                    <span class="transaction-subtitle">${transaction.subtitle}</span>
                </div>
            </div>
            <span class="transaction-amount ${transaction.type}">${transaction.amount >= 0 ? '+' : ''}$${Math.abs(transaction.amount).toFixed(2)}</span>
        `;
        transactionList.appendChild(transactionItem);
    });
}

function updateChoreSummary() {
    let totalChores = sharedData.chores.length;
    let completedChores = sharedData.chores.filter(chore => chore.status === "Approved").length;
    let pendingChores = sharedData.chores.filter(chore => chore.status === "To Be Approved").length;

    document.getElementById('totalChores').textContent = totalChores;
    document.getElementById('completedChores').textContent = `${completedChores}/${totalChores}`;
    document.getElementById('pendingChores').textContent = pendingChores;

    updateDial(completedChores, totalChores);
}

function updateDial(completedChores, totalChores) {
    const dialProgress = document.querySelector('.dial-progress');
    const dialDot = document.querySelector('.dial-dot');
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    
    const completionPercentage = (completedChores / totalChores) * 100;
    const dashArray = (completionPercentage / 100) * circumference;
    dialProgress.style.strokeDasharray = `${dashArray} ${circumference}`;

    const angle = (completionPercentage / 100) * 2 * Math.PI;
    const dotX = 60 + radius * Math.sin(angle);
    const dotY = 60 - radius * Math.cos(angle);
    dialDot.setAttribute('cx', dotX);
    dialDot.setAttribute('cy', dotY);
}

function renderChores() {
    const choreList = document.getElementById('chore-list');
    if (!choreList) return;

    choreList.innerHTML = '';
    sharedData.chores.forEach(chore => {
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
                ${chore.status === "To Be Approved" ? '<button class="approve-chore-button">Approve</button>' : ''}
            </div>
        `;
        choreList.appendChild(choreItem);
    });
    updateChoreSummary();
}

function initializePage() {
    if (document.getElementById('totalBalance')) {
        updateDashboard();
    }
    if (document.getElementById('chore-list')) {
        renderChores();
    }
}

window.onload = initializePage;

// Event listeners
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('approve-chore-button')) {
        const choreName = e.target.closest('.chore-item').querySelector('.chore-name').textContent;
        updateChoreStatus(choreName, 'Approved');
        renderChores();
    }
});
