export const transactionHistory = [
    {type: 'earned', description: 'Earned', subtitle: 'Clean your room', amount: 1.00, icon: 'fa-plus-circle', datetime: '2024-07-01T08:30:00Z'},
    {type: 'earned', description: 'Earned', subtitle: 'Do the dishes', amount: 2.00, icon: 'fa-plus-circle', datetime: '2024-07-02T15:00:00Z'},
    {type: 'received', description: 'Received', subtitle: 'Weekly allowance', amount: 8.00, icon: 'fa-plus-circle', datetime: '2024-07-03T09:00:00Z'},
    {type: 'spent', description: 'Spent', subtitle: 'Bought a book', amount: -5.00, icon: 'fa-minus-circle', datetime: '2024-07-03T10:15:00Z'},
    {type: 'saved', description: 'Saved', subtitle: 'Transfer to Savings', amount: -3.00, icon: 'fa-piggy-bank', datetime: '2024-07-04T11:45:00Z'}
];

export const choresList = [
    { name: "Clean your room", reward: 1.00, icon: "fa-broom", frequency: "Daily", status: "To Do" },
    { name: "Take out the trash", reward: 0.50, icon: "fa-trash", frequency: "Weekly", status: "To Be Approved" },
    { name: "Do the dishes", reward: 2.00, icon: "fa-sink", frequency: "Daily", status: "Approved" }
];

export const defaultData = {
    child: {
        spendingBalance: 0,
        savingsBalance: 0,
        rewardsBalance: 0,
    },
    chores: [...choresList]
};
