// dropdown.js
document.addEventListener('DOMContentLoaded', function () {
    var dropdownBtn = document.getElementById('fish-dropdown-btn');
    var dropdownContent = document.getElementById('fish-dropdown-content');
    var checkboxes = document.querySelectorAll('.fish-checkbox');

    // Display/hide dropdown content
    dropdownBtn.addEventListener('click', function () {
        dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
    });

    // Close dropdown when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!event.target.matches('#fish-dropdown-btn')) {
            dropdownContent.style.display = 'none';
        }
    });

    // Handle checkbox change event
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            // You can customize this function to perform actions when checkboxes change
            console.log('Fish selected:', this.value, 'Checked:', this.checked);
            // Add logic to update the displayed fish based on checkbox state
        });
    });
});
