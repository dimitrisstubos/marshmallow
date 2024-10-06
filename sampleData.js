export const defaultTransactions = [
    {type: 'earned', description: 'Earned', subtitle: 'Made their bed', amount: 2.00, icon: 'fa-plus-circle'},
    {type: 'received', description: 'Received', subtitle: 'Weekly allowance', amount: 8.00, icon: 'fa-plus-circle'},
    {type: 'spent', description: 'Spent', subtitle: 'Internet purchase', amount: -15.00, icon: 'fa-minus-circle'},
    {type: 'saved', description: 'Saved', subtitle: 'Transfer to Savings', amount: -10.00, icon: 'fa-piggy-bank'},
    {type: 'swapped', description: 'Swapped', subtitle: 'Swapped USDC to SOL', amount: 5.00, icon: 'fa-exchange-alt'}
];

export const defaultData = {
    child: {
        spendingBalance: 0,
        savingsBalance: 0,
        rewardsBalance: 0,
    },
    chores: [
        { name: "Clean your room", reward: 1.00, icon: "fa-broom", frequency: "Daily", status: "To Do" },
        { name: "Take out the trash", reward: 0.50, icon: "fa-trash", frequency: "Weekly", status: "To Be Approved" },
        { name: "Do the dishes", reward: 2.00, icon: "fa-sink", frequency: "Daily", status: "Approved" }
    ]
};
