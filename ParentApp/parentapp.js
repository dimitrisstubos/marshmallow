import { sharedData, transactions, calculateTotalBalance, updateChoreStatus } from '../globalLogic.js';
import { updateDial } from './parent_dial.js';

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
    transactions.forEach(transaction => {
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

function renderChores(filter = 'all') {
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
                    ${chore.status === "To Be Approved" ? '<button class="approve-chore-button">Approve</button>' : ''}
                </div>
            `;
            choreList.appendChild(choreItem);
        }
    });
    updateChoreSummary();
}

function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            renderChores(filter);
        });
    });
}

function initializePage() {
    if (document.getElementById('totalBalance')) {
        updateDashboard();
    }
    if (document.getElementById('chore-list')) {
        initializeFilterButtons();
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
