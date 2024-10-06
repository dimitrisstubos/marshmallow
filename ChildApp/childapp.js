import { sharedData, calculateTotalBalance, updateChoreStatus } from '../sharedData.js';
import { updateDial } from './child_dial.js';

function updateDashboard() {
    const child = sharedData.child;
    child.totalBalance = calculateTotalBalance(child);
    
    document.getElementById('totalBalance').textContent = child.totalBalance.toFixed(2);
    document.getElementById('spendingBalance').textContent = child.spendingBalance.toFixed(2);
    document.getElementById('savingsBalance').textContent = child.savingsBalance.toFixed(2);
    document.getElementById('rewardsBalance').textContent = child.rewardsBalance.toFixed(2);
}

function updateSummary() {
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
                ${chore.status === "To Do" ? '<button class="request-approval-button">Request Approval</button>' : ''}
            </div>
        `;
        choreList.appendChild(choreItem);
    });
    updateSummary();
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

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('request-approval-button')) {
        const choreName = e.target.closest('.chore-item').querySelector('.chore-name').textContent;
        updateChoreStatus(choreName, 'To Be Approved');
        renderChores();
    }
});