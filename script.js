// Select elements
const vbucksInput = document.getElementById('vbucks-amount');
const priceDisplay = document.getElementById('price-display');
const epicCheck = document.getElementById('epic-check');
const buyBtn = document.getElementById('buy-btn');
const checkboxIcon = document.getElementById('checkbox-icon'); // Select the checkbox icon

// Price per 1000 V-Bucks
const pricePer1000Vbucks = 5.99;

// Show a notification
function showNotification(message, isError) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    if (isError) {
        notification.classList.add('error');
    } else {
        notification.classList.add('success');
    }
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    // Get the current number of notifications
    const notifications = document.querySelectorAll('.notification');

    // Recalculate and apply positions for all notifications
    notifications.forEach((notif, index) => {
        notif.style.setProperty('--initial-top', `${index * 60 + 20}px`);
        notif.style.setProperty('--new-top', `${index * 60 + 20}px`);
        notif.style.top = `${index * 60 + 20}px`;
    });

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.add('fadeOut'); // Trigger fade-out animation on removal
        setTimeout(() => {
            notification.remove();

            // Recalculate and apply positions after removal
            const remainingNotifications = document.querySelectorAll('.notification');
            remainingNotifications.forEach((notif, index) => {
                notif.style.setProperty('--new-top', `${index * 60 + 20}px`);
                notif.style.top = `${index * 60 + 20}px`;
            });
        }, 300); // Wait for the slide-out animation to finish before removing the notification
    }, 5000); // Keep notification for 5 seconds
}

// Calculate the price based on V-Bucks
function calculatePrice(vbucks) {
    const price = (vbucks / 1000) * pricePer1000Vbucks;
    return price.toFixed(2);
}

// Handle V-Bucks input change
vbucksInput.addEventListener('input', function () {
    // Remove invalid characters (e, -, +) from the input value
    vbucksInput.value = vbucksInput.value.replace(/[e\-\+]/g, '');

    let vbucks = parseInt(vbucksInput.value);

    if (vbucks > 20000) {
        vbucksInput.value = '';
        priceDisplay.textContent = 'Prijs: €0,00';
        showNotification('Het maximale V-Bucks aantal is 20.000!', true);
        buyBtn.disabled = true;
        return;
    }

    if (!isNaN(vbucks) && vbucks > 0) {
        const price = calculatePrice(vbucks);
        priceDisplay.textContent = `Prijs: €${price}`;

        // Enable "Buy" button only if checkbox is checked
        if (epicCheck.checked) {
            buyBtn.disabled = false;
        }
    } else {
        priceDisplay.textContent = 'Prijs: €0,00';
        showNotification('Voer een geldig aantal V-Bucks in.', true);
        buyBtn.disabled = true;
    }
});

// Adjusted checkbox behavior
epicCheck.addEventListener('change', function () {
    const itemName = document.getElementById('item-name').value.trim();
    const epicName = document.getElementById('epic-name').value.trim();
    const vbucksValue = parseInt(vbucksInput.value);

    // Conditions for enabling the checkbox
    if (itemName && epicName && !isNaN(vbucksValue) && vbucksValue >= 100) {
        // Toggle the FontAwesome icon class based on the checkbox state
        if (epicCheck.checked) {
            checkboxIcon.classList.remove('fa-circle');
            checkboxIcon.classList.add('fa-check-circle');
        } else {
            checkboxIcon.classList.remove('fa-check-circle');
            checkboxIcon.classList.add('fa-circle');
        }

        // Enable the buy button only if checkbox is checked
        buyBtn.disabled = !epicCheck.checked || !itemName || !epicName || isNaN(vbucksValue) || vbucksValue <= 0;
    } else {
        epicCheck.checked = false; // Ensure the checkbox is unchecked when the conditions are not met
        checkboxIcon.classList.remove('fa-check-circle');
        checkboxIcon.classList.add('fa-circle'); // Reset the icon to the unchecked state

        // Notify the user about the invalid condition
        showNotification(
            vbucksValue < 100
                ? 'Het minimum aantal V-Bucks is 100.'
                : 'Vul alle velden in, alstublieft.',
            true
        );

        // Keep the checkbox enabled, but make sure it's unchecked
        buyBtn.disabled = true;
    }
});

// Function to update the button state
function updateButtonState() {
    const itemName = document.getElementById('item-name').value.trim();
    const epicName = document.getElementById('epic-name').value.trim();
    const vbucks = parseInt(vbucksInput.value);

    // Enable or disable the buy button based on the validity of the form
    buyBtn.disabled = !epicCheck.checked || !itemName || !epicName || isNaN(vbucks) || vbucks <= 0;
}

// Re-enable the checkbox when input fields are filled correctly
vbucksInput.addEventListener('input', updateButtonState);
document.getElementById('item-name').addEventListener('input', updateButtonState);
document.getElementById('epic-name').addEventListener('input', updateButtonState);

// Update the button state with each input change
vbucksInput.addEventListener('input', updateButtonState);
document.getElementById('item-name').addEventListener('input', updateButtonState);
document.getElementById('epic-name').addEventListener('input', updateButtonState);

// Add event listener for the "+" icons to clear fields
const itemNameIcon = document.getElementById('item-name-icon');
const epicNameIcon = document.getElementById('epic-name-icon');
const vbucksAmountIcon = document.getElementById('vbucks-amount-icon');

// Select the input fields
const itemNameInput = document.getElementById('item-name');
const epicNameInput = document.getElementById('epic-name');
const vbucksAmountInput = document.getElementById('vbucks-amount');

// Function to clear all fields and reset the UI
function clearFields() {
    itemNameInput.value = '';
    epicNameInput.value = '';
    vbucksAmountInput.value = '';
    priceDisplay.textContent = 'Prijs: €0,00';
    epicCheck.checked = false;
    checkboxIcon.classList.remove('fa-check-circle');
    checkboxIcon.classList.add('fa-circle');
    buyBtn.disabled = true;
    epicCheck.disabled = false; // Keep the checkbox enabled after clearing
    showNotification('De gift is succesvol toegevoegd.', false); 
}

// Add event listeners to "+" icons for clearing the fields
itemNameIcon.addEventListener('click', clearFields);
epicNameIcon.addEventListener('click', clearFields);
vbucksAmountIcon.addEventListener('click', clearFields);

// Function to add a new label and input below the current ones
function addNewLabel() {
    const labelsContainer = document.getElementById('labels-container');
    const labelCount = labelsContainer.querySelectorAll('.label-group').length + 1;

    // Create a new label group
    const newLabelGroup = document.createElement('div');
    newLabelGroup.classList.add('label-group');
    newLabelGroup.id = `label-group-${labelCount}`;

    // Create the label for the new input field
    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', `label-${labelCount}`);
    newLabel.textContent = `Label ${labelCount}`;

    // Create the new input field
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('id', `label-${labelCount}`);
    newInput.classList.add('input-field');

    // Append the label and input field to the new label group
    newLabelGroup.appendChild(newLabel);
    newLabelGroup.appendChild(newInput);

    // Append the new label group to the labels container
    labelsContainer.appendChild(newLabelGroup);
}

// Example of adding a new label when a button is clicked
document.getElementById('add-label-btn').addEventListener('click', addNewLabel);















// Ensure the labels are shown correctly based on input content and focus
document.querySelectorAll('.input-field').forEach(input => {
    const label = input.nextElementSibling; // Get the associated label

    // On focus (when the input field is focused)
    input.addEventListener('focus', () => {
        label.classList.add('filled');
        input.placeholder = ''; // Remove placeholder text when focused
    });

    // On blur (when the input field loses focus)
    input.addEventListener('blur', () => {
        if (input.value.trim() === "") {
            label.classList.remove('filled');
            input.placeholder = input.getAttribute('placeholder'); // Restore placeholder if input is empty
        }
    });

    // On input change (typing in the field)
    input.addEventListener('input', () => {
        if (input.value.trim() !== "") {
            label.classList.add('filled');
            input.placeholder = ''; // Remove placeholder text when typing
        } else {
            label.classList.remove('filled');
            if (!input.matches(':focus')) { // Only restore placeholder if not focused
                input.placeholder = input.getAttribute('placeholder'); // Restore placeholder if input is empty
            }
        }
    });
});
