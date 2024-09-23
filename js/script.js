let balance = 70000; // Initial account balance
document.getElementById('balanceAmount').textContent = balance;


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
    document.getElementById(activeId).classList.add('bg-lime', 'text-text-primary');
    document.getElementById(inactiveId).classList.remove('bg-lime', 'text-text-primary');
    document.getElementById(inactiveId).classList.add('border', 'border-gray-200', 'text-black');
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


    addToHistory(donationAmount, cardId);

    // Clear the input field
    donationInput.value = '';

    my_modal_4.showModal();
}



function addToHistory(donationAmount, cartId) {
    const historyList = document.getElementById('historyList');
    const timestamp = new Date().toString();
    let message;

    // Define the donation message based on the card ID
    if (cartId === 1) {
        message = 'Flood Relief in Noakhali, Bangladesh';
    } else if (cartId === 2) {
        message = 'Flood Relief in Feni, Bangladesh';
    } else if (cartId === 3) {
        message = 'Aid for Injured in the Quota Movement, Bangladesh';
    }

    // Create the transaction card
    const transactionCard = `
        <div class="p-4 md:p-8 border-gray-300 border rounded-xl mt-4 md:mt-8">
            <div class="space-y-3">
                <h2 class="text-text-primary font-bold text-xl">
                    <span>${donationAmount}</span> Taka is Donated for <span>${message}</span>
                </h2>
                <p class="text-text-gray">Date: <span>${timestamp}</span></p>
            </div>
        </div>
    `;

    // Insert the transaction card as HTML into the history section
    historyList.insertAdjacentHTML('beforeend', transactionCard);
}
