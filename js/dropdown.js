// dropdown.js

import { manualFishNames } from './script.js';

document.addEventListener('DOMContentLoaded', function () {
    var dropdownBtn = document.getElementById('fish-dropdown-btn');
    var dropdownContent = document.getElementById('fish-dropdown-content');
    var checkboxesContainer = document.getElementById('checkboxes-container');

    // Function to toggle dropdown visibility
    function toggleDropdown(event) {
        event.stopPropagation(); // Prevent event from reaching document click listener
        dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
    }

    // Display/hide dropdown content when clicking the button
    dropdownBtn.addEventListener('click', function (event) {
        toggleDropdown(event);
    });

    // Close dropdown when clicking outside of it
    document.addEventListener('click', function () {
        dropdownContent.style.display = 'none';
    });

    // Initially hide the dropdown content
    dropdownContent.style.display = 'none';

    manualFishNames
        .filter(fishName => !fishName.endsWith('flip.gif'))
        .forEach(function (fishName) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'fish-checkbox';
            checkbox.value = fishName;
            checkbox.checked = true; // Set default state to checked

            const label = document.createElement('label');
            label.appendChild(checkbox);

            // Create a small image of the fish for the label
            const fishImage = document.createElement('img');
            fishImage.src = `assets/${fishName}`;
            fishImage.alt = fishName.replace('.gif', ''); // Alt text without '.gif'
            label.appendChild(fishImage);

            // Set initial border state
            if (checkbox.checked) {
                label.classList.add('selected-border');
            }

            checkboxesContainer.appendChild(label);
        });

    // Handle checkbox change event
    checkboxesContainer.addEventListener('change', function (event) {
        if (event.target.matches('.fish-checkbox')) {
            const isSelected = event.target.checked;
            toggleBorderClass(event.target.parentNode, isSelected);
            console.log('Fish selected:', event.target.value, 'Checked:', isSelected);
            // Add logic to update the displayed fish based on checkbox state
        }
    });

    // Function to toggle the border class
    function toggleBorderClass(element, isSelected) {
        if (isSelected) {
            element.classList.add('selected-border');
        } else {
            element.classList.remove('selected-border');
        }
    }
});
