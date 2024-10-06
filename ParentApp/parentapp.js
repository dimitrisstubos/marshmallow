import { updateChoreStatus } from '../choreManagement.js';
import { updateDashboard, renderChores, renderTransactions } from './parentapp_render.js';
import { addTransaction } from '../financialOperations.js';

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
        // Set the 'to-be-approved' button as active before initializing other buttons
        const toBeApprovedButton = document.querySelector('.filter-button[data-filter="to-be-approved"]');
        if (toBeApprovedButton) {
            toBeApprovedButton.classList.add('active');
        }
        
        initializeFilterButtons();
        renderChores('to-be-approved');
    }
}

window.onload = initializePage;

// Event listeners
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('approve-chore-button')) {
        const choreItem = e.target.closest('.chore-item');
        const choreName = choreItem.querySelector('.chore-name').textContent;
        const choreReward = parseFloat(choreItem.querySelector('.chore-reward').textContent.slice(1));
        
        updateChoreStatus(choreName, 'Approved');
        
        addTransaction({
            type: 'reward',
            amount: choreReward,
            description: `Chore Completed: ${choreName}`,
            subtitle: 'Reward',
            icon: 'fa-check-circle'
        });
        
        renderChores('to-be-approved');
        updateDashboard();
    }
});
