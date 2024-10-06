import { transactionHistory, defaultData } from './sampleData.js';

export function resetData() {
    localStorage.setItem('sharedData', JSON.stringify(defaultData));
    localStorage.setItem('transactions', JSON.stringify(transactionHistory));
    window.location.reload(); 
}