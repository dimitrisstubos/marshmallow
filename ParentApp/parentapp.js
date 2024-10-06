import { updateChoreStatus } from '../choreManagement.js';
import { updateDashboard, renderChores, renderTransactions } from './parentapp_render.js';
import { addTransaction } from '../financialOperations.js';

function initializeFilterButtons() {
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderChores(this.dataset.filter);
        });
    });
}

function initializePage() {
    if (document.getElementById('totalBalance')) updateDashboard();
    if (document.getElementById('chore-list')) {
        document.querySelector('.filter-button[data-filter="to-be-approved"]')?.classList.add('active');
        initializeFilterButtons();
        renderChores('to-be-approved');
    }
}

window.onload = initializePage;

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('approve-chore-button')) {
        const choreItem = e.target.closest('.chore-item');
        const choreName = choreItem.querySelector('.chore-name').textContent;
        const choreReward = parseFloat(choreItem.querySelector('.chore-reward').textContent.slice(1));
        
        updateChoreStatus(choreName, 'Approved');
        addTransaction({
            type: 'earned', // Ensure type is 'earned'
            description: 'Earned', // Set description to 'Earned'
            subtitle: choreName, // Use chore name as subtitle
            amount: choreReward,
            icon: 'fa-plus-circle', // Use the appropriate icon
            datetime: new Date().toISOString() // Set current datetime
        });
        
        renderChores('to-be-approved');
        updateDashboard();
    }
});
