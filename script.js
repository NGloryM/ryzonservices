// Select elements
const vbucksInput = document.getElementById('vbucks-amount');
const priceDisplay = document.getElementById('price-display');
const epicCheck = document.getElementById('epic-check');
const buyBtn = document.getElementById('buy-btn');
const checkboxIcon = document.getElementById('checkbox-icon'); // Select the checkbox icon

// Price per 1000 V-Bucks
const pricePer1000Vbucks = 5.99;

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Existing scroll functionality for buttons
    const vbucksBtn = document.getElementById('vbucks-btn');
    const infoVbucksBtn = document.getElementById('info-vbucks-btn');
    const giftsBtn = document.getElementById('gifts-btn');
    const infoFnGiftsBtn = document.getElementById('info-fn-gifts-btn');
    const vbucksSection = document.getElementById('koop-vbucks-section');
    const giftsSection = document.getElementById('koop-gifts-section');

    function scrollToSection(event, section) {
        event.preventDefault();
        section.scrollIntoView({ behavior: 'smooth' });
    }

    vbucksBtn.addEventListener('click', (event) => scrollToSection(event, vbucksSection));
    infoVbucksBtn.addEventListener('click', (event) => scrollToSection(event, vbucksSection));
    giftsBtn.addEventListener('click', (event) => scrollToSection(event, giftsSection));
    infoFnGiftsBtn.addEventListener('click', (event) => scrollToSection(event, giftsSection));
});

// Contact Form and Overlay functionality
const contactOverlay = document.getElementById('contact-overlay');
const contactBtn = document.querySelector('.nav-button:last-child'); // CONTACT button
const closeContactBtn = document.getElementById('close-contact');
const contactForm = document.getElementById('contact-form');

// Show overlay
contactBtn.addEventListener('click', (event) => {
    event.preventDefault();
    contactOverlay.classList.add('active');
});

// Close overlay
closeContactBtn.addEventListener('click', () => {
    contactOverlay.classList.remove('active');
});

// Sluit de overlay via de ESC-toets
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        contactOverlay.classList.remove('active');
    }
});

// Het verzenden van het formulier
contactForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Voorkomt de standaard formverzending

    // Verzamel formulierwaarden
    const discordnaam = document.getElementById('discordnaam').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;
    const phone = document.getElementById('phone').value || 'Niet opgegeven'; // Default waarde indien niet ingevuld

    // Voorbereiden van de payload voor de Discord-webhook
    const payload = {
        username: 'Ryzon Services', // De naam van de verzender in Discord
        avatar_url: 'https://i.imgur.com/U0CQ0XN.png', // Logo van de service
        embeds: [
            {
                title: subject, // Het onderwerp als de titel van de embed
                color: 5814783, // Kleur van de embed (blauw)
                fields: [
                    {
                        name: '`📧` Discord-naam:',
                        value: `\`@${discordnaam}\``, // Discord naam met backticks
                        inline: false,
                    },
                    {
                        name: '\u200B', // Zero-width space voor subtiele lege ruimte
                        value: '\u200B', // Lege waarde voor minimale ruimte
                        inline: false,
                    },
                    {
                        name: '`📱` Telefoonnummer:',
                        value: `\`${phone}\``, // Telefoonnummer met backticks
                        inline: false,
                    },
                    {
                        name: '\u200B', // Zero-width space voor subtiele lege ruimte
                        value: '\u200B', // Lege waarde voor minimale ruimte
                        inline: false,
                    },
                    {
                        name: '`📃` Bericht:',
                        value: `\`${description}\``, // Bericht met backticks
                        inline: false,
                    },
                    {
                        name: '\u200B', // Zero-width space voor subtiele lege ruimte
                        value: '\u200B', // Lege waarde voor minimale ruimte
                        inline: false,
                    }
                ],
                footer: {
                    text: `Ryzon Services - ${new Date().toLocaleString()}`, // Toevoegen van de datum en tijd in de footer
                    icon_url: 'https://i.imgur.com/U0CQ0XN.png', // Logo van de service
                },
            },
        ],
    };    

    // Verstuur de gegevens naar de webhook via een POST-verzoek
    try {
        const response = await fetch(
            'https://discord.com/api/webhooks/1331569927303204885/VBAID8qd-Z1tvNjY-aYun10nTR-ivreC-Bb3-rtgxhLup__uoQ-E-m6vSzcNlCKJO2mP',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload), // Converteer de payload naar een JSON-string
            }
        );

        // Controleer of het verzoek succesvol was
        if (response.ok) {
            // Gebruik de bestaande showNotification functie voor succes
            showNotification('Bericht succesvol verzonden!', false); // 'false' voor succes
            contactOverlay.classList.remove('active'); // Sluit de overlay
            contactForm.reset(); // Reset het formulier
        } else {
            // Gebruik de bestaande showNotification functie voor foutmelding
            showNotification('Fout bij het verzenden van het bericht.', true); // 'true' voor fout
        }
    } catch (error) {
        // Gebruik de bestaande showNotification functie voor foutmelding bij netwerkproblemen
        showNotification('Er ging iets mis. Probeer het opnieuw.', true); // 'true' voor fout
        console.error('Error:', error); // Log de fout naar de console
    }
});

// Methods Overlay functionality
const methodsButton = document.getElementById('methods-button');
const methodsOverlay = document.getElementById('methods-overlay');
const closeMethodsButton = document.getElementById('close-methods');

// Functie om de overlay te tonen
function showMethodsOverlay() {
    methodsOverlay.classList.add('active');
}

// Functie om de overlay te sluiten
function closeMethodsOverlay() {
    methodsOverlay.classList.remove('active');
}

// Event listeners voor de "Onze Methoden" knop
methodsButton.addEventListener('click', showMethodsOverlay);
closeMethodsButton.addEventListener('click', closeMethodsOverlay);

// Sluit de overlay wanneer je buiten de overlay klikt
methodsOverlay.addEventListener('click', (event) => {
    if (event.target === methodsOverlay) {
        closeMethodsOverlay();
    }
});

// Sluit de overlay via de ESC-toets
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMethodsOverlay();
        contactOverlay.classList.remove('active'); // Sluit ook de contact overlay als open
    }
});

// Functie om overlays te sluiten wanneer je ESC of buiten de overlay klikt
function closeOverlayOnEscapeOrClick(overlayElement) {
    overlayElement.addEventListener('click', (event) => {
        if (event.target === overlayElement) {
            overlayElement.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            overlayElement.classList.remove('active');
        }
    });
}

// Gebruik de functie voor beide overlays
closeOverlayOnEscapeOrClick(contactOverlay);
closeOverlayOnEscapeOrClick(methodsOverlay);



// Methoden Overlay functionaliteit
const vbucksMethodHeader = document.getElementById('vbucks-method-header');
const giftMethodHeader = document.getElementById('gift-method-header');
const vbucksMethodDescription = document.getElementById('vbucks-method-description');
const giftMethodDescription = document.getElementById('gift-method-description');

// Functie om de overlay te tonen
methodsButton.addEventListener('click', () => {
    methodsOverlay.classList.add('active');
});

// Sluit de overlay
closeMethodsButton.addEventListener('click', () => {
    methodsOverlay.classList.remove('active');
});

// Sluit de overlay wanneer je buiten de overlay klikt
methodsOverlay.addEventListener('click', (event) => {
    if (event.target === methodsOverlay) {
        methodsOverlay.classList.remove('active');
    }
});

// Sluit de overlay via de ESC-toets
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        methodsOverlay.classList.remove('active');
    }
});

// Functie voor het openen van de beschrijving van de V-Bucks Methode
vbucksMethodHeader.addEventListener('click', () => {
    const description = vbucksMethodDescription;
    description.classList.toggle('show');
    // Draai de pijl van de V-Bucks Methode
    const chevron = vbucksMethodHeader.querySelector('.chevron');
    chevron.classList.toggle('rotate');
});

// Functie voor het openen van de beschrijving van de Gift Methode
giftMethodHeader.addEventListener('click', () => {
    const description = giftMethodDescription;
    description.classList.toggle('show');
    // Draai de pijl van de Gift Methode
    const chevron = giftMethodHeader.querySelector('.chevron');
    chevron.classList.toggle('rotate');
});



























// Notification functionality
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
        notification.classList.add('fadeOut');
        setTimeout(() => {
            notification.remove();

            // Recalculate and apply positions after removal
            const remainingNotifications = document.querySelectorAll('.notification');
            remainingNotifications.forEach((notif, index) => {
                notif.style.setProperty('--new-top', `${index * 60 + 20}px`);
                notif.style.top = `${index * 60 + 20}px`;
            });
        }, 300);
    }, 5000);
}

// Calculate the price based on V-Bucks
function calculatePrice(vbucks) {
    const price = (vbucks / 1000) * pricePer1000Vbucks;
    return price.toFixed(2);
}

// Handle V-Bucks input change
vbucksInput.addEventListener('input', function () {
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

    if (itemName && epicName && !isNaN(vbucksValue) && vbucksValue >= 100) {
        if (epicCheck.checked) {
            checkboxIcon.classList.remove('fa-circle');
            checkboxIcon.classList.add('fa-check-circle');
        } else {
            checkboxIcon.classList.remove('fa-check-circle');
            checkboxIcon.classList.add('fa-circle');
        }

        buyBtn.disabled = !epicCheck.checked || !itemName || !epicName || isNaN(vbucksValue) || vbucksValue <= 0;
    } else {
        epicCheck.checked = false;
        checkboxIcon.classList.remove('fa-check-circle');
        checkboxIcon.classList.add('fa-circle');
        showNotification(
            vbucksValue < 100
                ? 'Het minimum aantal V-Bucks is 100.'
                : 'Vul alle velden in, alstublieft.',
            true
        );
        buyBtn.disabled = true;
    }
});

// Update the button state based on input fields
function updateButtonState() {
    const itemName = document.getElementById('item-name').value.trim();
    const epicName = document.getElementById('epic-name').value.trim();
    const vbucks = parseInt(vbucksInput.value);

    buyBtn.disabled = !epicCheck.checked || !itemName || !epicName || isNaN(vbucks) || vbucks <= 0;
}

// Re-enable the checkbox when input fields are filled correctly
vbucksInput.addEventListener('input', updateButtonState);
document.getElementById('item-name').addEventListener('input', updateButtonState);
document.getElementById('epic-name').addEventListener('input', updateButtonState);

// Add event listeners to "+" icons to clear fields
const itemNameIcon = document.getElementById('item-name-icon');
const epicNameIcon = document.getElementById('epic-name-icon');
const vbucksAmountIcon = document.getElementById('vbucks-amount-icon');

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
    epicCheck.disabled = false;
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

    const newLabelGroup = document.createElement('div');
    newLabelGroup.classList.add('label-group');
    newLabelGroup.id = `label-group-${labelCount}`;

    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', `label-${labelCount}`);
    newLabel.textContent = `Label ${labelCount}`;

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('id', `label-${labelCount}`);
    newInput.classList.add('input-field');

    newLabelGroup.appendChild(newLabel);
    newLabelGroup.appendChild(newInput);
    labelsContainer.appendChild(newLabelGroup);
}

// Example of adding a new label when a button is clicked
document.getElementById('add-label-btn').addEventListener('click', addNewLabel);

// Ensure labels show correctly based on input content and focus
document.querySelectorAll('.input-field').forEach(input => {
    const label = input.nextElementSibling;

    input.addEventListener('focus', () => {
        label.classList.add('filled');
        input.placeholder = '';
    });

    input.addEventListener('blur', () => {
        if (input.value.trim() === "") {
            label.classList.remove('filled');
            input.placeholder = input.getAttribute('placeholder');
        }
    });

    input.addEventListener('input', () => {
        if (input.value.trim() !== "") {
            label.classList.add('filled');
            input.placeholder = '';
        } else {
            label.classList.remove('filled');
            if (!input.matches(':focus')) {
                input.placeholder = input.getAttribute('placeholder');
            }
        }
    });
});
