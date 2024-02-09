// dropdown.js

import { floatingFish } from './script.js';

document.addEventListener('DOMContentLoaded', function () {
    var dropdownContent = document.getElementById('fish-dropdown-content');
    var checkboxesContainer = document.getElementById('checkboxes-container');

    // Function to toggle dropdown visibility
    function toggleDropdown(event) {
        event.stopPropagation(); // Prevent event from reaching document click listener
        dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
    }

    // Initially hide the dropdown content
    // dropdownContent.style.display = 'none';

    // Add the crab manually to the floatingFish array
    // const crabFishObject = {
    //     'Crab.gif': [
    //         { 'selected': true },
    //         { 'images': ['Crab.gif', 'Crab flip.gif'] }
    //     ]
    // };

    // floatingFish.push(crabFishObject);

    // Loop through the floatingFish array and create checkboxes for each fish
    floatingFish.forEach(function (fishObject) {
        const fish = Object.keys(fishObject)[0];

        // Create checkbox for each fish
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'fish-checkbox';
        checkbox.value = fishObject[fish].name;
        checkbox.checked = true; // Set default state to checked

        const label = document.createElement('label');
        label.appendChild(checkbox);

        // Create a small image of the fish for the label
        const fishImage = document.createElement('img');
        fishImage.src = fishObject[fish].url;
        fishImage.alt = fishObject[fish].name.replace('.gif', ''); // Alt text without '.gif'
        label.appendChild(fishImage);

        // Set initial border state
        if (checkbox.checked) {
            label.classList.add('selected-border');
            console.log('Just checking')
        }

        checkboxesContainer.appendChild(label);
    });

    // Handle checkbox change event
    checkboxesContainer.addEventListener('change', function (event) {
        const checkbox = event.target.closest('.fish-checkbox');
        if (checkbox) {
            const isSelected = checkbox.checked;
            toggleBorderClass(checkbox.parentNode, isSelected);
            console.log('Fish selected:', checkbox.value, 'Checked:', isSelected);
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
