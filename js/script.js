// script.js
document.addEventListener('DOMContentLoaded', function () {
    const aquarium = document.getElementById('aquarium');
    const aquariumWidth = aquarium.clientWidth;
    const aquariumHeight = aquarium.clientHeight;

    function addFish(imgSrc) {
        const fish = document.createElement('div');
        fish.className = 'fish'; // Explicitly add the 'fish' class
        aquarium.appendChild(fish);
    
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Fish';
        img.className = 'fish'; // Explicitly add the 'fish' class to the img element
        fish.appendChild(img);
    
        makeDraggable(fish);
        moveFishRandomly(fish);
    }
     

    function makeDraggable(element) {
        let isDragging = false;
        let offsetX, offsetY;
        let isFishStopped = false;
    
        element.addEventListener('mousedown', function (e) {
            if (e.detail === 1) { // Single click
                isFishStopped = true;
                element.classList.add('stopped');
                element.style.transition = 'none';
    
                // Set the position to the mouse location
                element.style.left = e.clientX - offsetX + 'px';
                element.style.top = e.clientY - offsetY + 'px';
    
                // Remove the transition class when the mouse is pressed
                element.classList.remove('fish-moving');
            } else if (e.detail === 2) { // Double click
                // Handle double click behavior if needed
            }
            
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
    
            function dragMove(e) {
                if (isDragging) {
                    element.style.transition = 'none';
                    element.style.left = e.clientX - offsetX + 'px';
                    element.style.top = e.clientY - offsetY + 'px';
                }
            }
    
            function dragEnd() {
                isDragging = false;
                document.removeEventListener('mousemove', dragMove);
                document.removeEventListener('mouseup', dragEnd);
    
                // Add the transition class back when the mouse is released
                element.classList.add('fish-moving');
            }
    
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('mouseup', dragEnd);
        });
    }
    
    
    
    
    
    
    
    function moveFishRandomly(element) {
        let isFishStopped = false;
    
        function followMouse(e) {
            if (isFishStopped) {
                element.style.transition = 'none';
                element.style.transform = `translate(${e.clientX - element.clientWidth / 2}px, ${e.clientY - element.clientHeight / 2}px)`;
            }
        }
    
        element.addEventListener('mousedown', function (e) {
            isFishStopped = true;
            element.classList.add('stopped');
            document.addEventListener('mousemove', followMouse);
    
            // Remove the transition class when the mouse is pressed
            element.classList.remove('fish-moving');
        });
    
        element.addEventListener('mouseup', function () {
            isFishStopped = false;
            element.classList.remove('stopped');
            document.removeEventListener('mousemove', followMouse);
    
            // Add the transition class back when the mouse is released
            element.classList.add('fish-moving');
        });
    
        function getRandomPosition() {
            const x = Math.random() * (aquariumWidth - element.clientWidth);
            const y = Math.random() * (aquariumHeight - element.clientHeight);
            return { x, y };
        }
    
        function animateFish() {
            if (!isFishStopped) {
                const newPosition = getRandomPosition();
                element.classList.add('fish-moving'); // Add the class to apply the transition
                element.style.transform = `translate(${newPosition.x}px, ${newPosition.y}px)`;
    
                setTimeout(() => {
                    animateFish();
                }, 2000);
            }
        }
    
        animateFish();
    }
    
    
    
    
    
    
    

    // Create fish with different images
    addFish('assets/Angel.GIF');
    addFish('assets/Angler.GIF');
    addFish('assets/Blue.GIF');
    addFish('assets/Catfish.GIF');
});
