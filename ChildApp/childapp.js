import { addTransaction } from '../financialOperations.js';
import { updateChoreStatus } from '../choreManagement.js';
import { updateDashboard, renderChores, renderTransactions } from './childapp_render.js';

function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderChores(this.dataset.filter);
        });
    });
}

function initializePage() {
    if (document.getElementById('totalBalance')) updateDashboard();
    if (document.getElementById('chore-list')) {
        initializeFilterButtons();
        renderChores('to-do');
        document.querySelector('.filter-button[data-filter="to-do"]').classList.add('active');
    }
    if (document.getElementById('transaction-list')) renderTransactions();
}

window.onload = initializePage;

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('request-approval-button')) {
        const choreItem = e.target.closest('.chore-item');
        const choreName = choreItem.querySelector('.chore-name').textContent;
        updateChoreStatus(choreName, 'To Be Approved');
        renderChores();
        addTransaction({
            type: 'requested',
            description: 'Request Approval',
            subtitle: `${choreName}`,
            amount: sharedData.chores.find(c => c.name === choreName).reward,
            icon: 'fa-hourglass-half',
            datetime: new Date().toISOString()
        });
        renderTransactions();
        updateDashboard();
        window.location.reload();

    }
});