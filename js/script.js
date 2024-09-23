let balance = 500; // Initial account balance

// Show/Hide Donation and History sections
document.getElementById('donationBtn').addEventListener('click', () => {
    document.getElementById('donationSection').classList.remove('hidden');
    document.getElementById('historySection').classList.add('hidden');
    toggleButtonActive('donationBtn', 'historyBtn');
});

document.getElementById('historyBtn').addEventListener('click', () => {
    document.getElementById('donationSection').classList.add('hidden');
    document.getElementById('historySection').classList.remove('hidden');
    toggleButtonActive('historyBtn', 'donationBtn');
});

// Toggle button active status
function toggleButtonActive(activeId, inactiveId) {
    document.getElementById(activeId).classList.add('bg-lime','text-text-primary');
    document.getElementById(inactiveId).classList.remove('bg-lime','text-text-primary');
    document.getElementById(inactiveId).classList.add('bg-gray-200', 'text-black');
}

// Donation functionality
function donate(cardId) {
    const donationInput = document.getElementById(`donationInput${cardId}`);
    const donationAmount = parseFloat(donationInput.value);

    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (donationAmount > balance) {
        alert('Insufficient balance.');
        return;
    }

    // Deduct from balance
    balance -= donationAmount;
    document.getElementById('balanceAmount').textContent = balance;

    // Update the current donation amount
    const currentDonation = document.getElementById(`donation${cardId}`);
    const newDonationAmount = parseFloat(currentDonation.textContent) + donationAmount;
    currentDonation.textContent = newDonationAmount;

    // Add to history
    addToHistory(`Donated $${donationAmount} to Donation ${cardId}`);

    // Clear the input field
    donationInput.value = '';
}

// Add a transaction to history
function addToHistory(message) {
    const historyList = document.getElementById('historyList');
    const timestamp = new Date().toLocaleString();
    const listItem = document.createElement('li');
    listItem.textContent = `${timestamp}: ${message}`;
    historyList.appendChild(listItem);
}
