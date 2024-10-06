// Sample data for demonstration
const child = {
    spendingBalance: 31.20,
    savingsBalance: 20.22,
    rewardsBalance: 1.04
};

const chores = [
    { name: "Clean your room", reward: 1.00, icon: "fa-broom", frequency: "Daily", status: "To Do" },
    { name: "Take out the trash", reward: 0.50, icon: "fa-trash", frequency: "Weekly", status: "To Be Approved" },
    { name: "Do the dishes", reward: 2.00, icon: "fa-sink", frequency: "Daily", status: "Approved" }
];

function updateDashboard() {
    // Calculate total balance
    child.totalBalance = child.spendingBalance + child.savingsBalance;
    
    document.getElementById('totalBalance').textContent = child.totalBalance.toFixed(2);
    document.getElementById('spendingBalance').textContent = child.spendingBalance.toFixed(2);
    document.getElementById('savingsBalance').textContent = child.savingsBalance.toFixed(2);
    document.getElementById('rewardsBalance').textContent = child.rewardsBalance.toFixed(2);
}

function updateSummary() {
    let leftToEarn = 0;
    let toDo = 0;
    let earned = 0;
    let totalChores = chores.length;

    chores.forEach(chore => {
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

    const dialProgress = document.querySelector('.dial-progress');
    const dialDot = document.querySelector('.dial-dot');
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    
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
    chores.forEach(chore => {
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