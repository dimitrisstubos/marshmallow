document.addEventListener('DOMContentLoaded', () => {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const connectBtnText = document.getElementById('connectBtnText');
    let isConnected = false;

    connectWalletBtn.addEventListener('click', () => {
        if (!isConnected) {
            // Simulate connecting
            setTimeout(() => {
                isConnected = true;
                connectBtnText.textContent = 'Connected';
                connectWalletBtn.classList.add('connected');
                alert('Wallet connected successfully!');
            }, 1000); // Simulate a 1-second delay for connection
        } else {
            // Simulate disconnecting
            isConnected = false;
            connectBtnText.textContent = 'Connect';
            connectWalletBtn.classList.remove('connected');
        }
    });
});