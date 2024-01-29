// dropdown.js
document.addEventListener('DOMContentLoaded', function () {
    var dropdownBtn = document.getElementById('fish-dropdown-btn');
    var dropdownContent = document.getElementById('fish-dropdown-content');
    var checkboxesContainer = document.getElementById('checkboxes-container');

    // Display/hide dropdown content
    dropdownBtn.addEventListener('click', function () {
        dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
    });

    // Close dropdown when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!event.target.matches('#fish-dropdown-btn') && !event.target.matches('.fish-checkbox')) {
            dropdownContent.style.display = 'none';
        }
    });

    // Create checkboxes based on manualFishNames
    const manualFishNames = [
        'Algae.gif',
        'Algae flip.gif',
        'Angel.gif',
        'Angel flip.gif',
        'Angler.gif',
        'Angler flip.gif',
        'Blue.gif',
        'Blue.gif',
        'Blue flip.gif',
        'Catfish.gif',
        'Catfish flip.gif',
        'Jelly.gif',
        'Jelly flip.gif',
        'Lion.gif',
        'Lion flip.gif',
        'Puffer.gif',
        'Puffer flip.gif'
    ];

    manualFishNames.forEach(function (fishName) {
        // Only include fish names that do not end with 'flip.gif'
        if (!fishName.endsWith('flip.gif')) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'fish-checkbox';
            checkbox.value = fishName;
            checkbox.checked = true; // Set default state to checked

            const label = document.createElement('label');
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(fishName.replace('.gif', ''))); // Remove '.gif' from the label

            checkboxesContainer.appendChild(label);
        }
    });

    // Handle checkbox change event
    checkboxesContainer.addEventListener('change', function (event) {
        if (event.target.matches('.fish-checkbox')) {
            // You can customize this function to perform actions when checkboxes change
            console.log('Fish selected:', event.target.value, 'Checked:', event.target.checked);
            // Add logic to update the displayed fish based on checkbox state
        }
    });
});
