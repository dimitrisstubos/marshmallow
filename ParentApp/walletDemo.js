document.addEventListener('DOMContentLoaded', () => {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const connectBtnText = document.getElementById('connectBtnText');
    let isConnected = false;

    connectWalletBtn.addEventListener('click', () => {
        if (!isConnected) {
            // Simulate connecting
            setTimeout(() => {
                isConnected = true;
                connectBtnText.textContent = 'AbC..123';
                connectWalletBtn.classList.add('connected');
            }, 300); // Simulate a 1-second delay for connection
        } else {
            // Simulate disconnecting
            isConnected = false;
            connectBtnText.textContent = 'Connect';
            connectWalletBtn.classList.remove('connected');
        }
    });
});