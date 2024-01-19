document.addEventListener('DOMContentLoaded', async function () {
    const aquarium = document.getElementById('aquarium');
    const fishContainer = document.getElementById('fish-container');

    function updateAquariumDimensions() {
        aquariumWidth = aquarium.clientWidth;
        aquariumHeight = aquarium.clientHeight;
    }

    // Initial setup
    let aquariumWidth = aquarium.clientWidth;
    let aquariumHeight = aquarium.clientHeight;

    window.addEventListener('resize', updateAquariumDimensions);

    // Manually input fish names
    const manualFishNames = [
        'Algae-No-Background.gif', 
        'Algae-No-Background.gif', 
        'Angel-No-Background.gif', 
        'Angel-No-Background.gif', 
        'Catfish-No-Background.gif', 
        'Catfish-No-Background.gif', 
        'Crab-No-Background.gif', 
        'Crab-No-Background.gif', 
        'Jelly-No-Background.gif',
        'Jelly-No-Background.gif',
        'Lion-No-Background.gif',
        'Lion-No-Background.gif',
        'Puffer-No-Background.gif',
        'Puffer-No-Background.gif',
    ];

    async function addFishManually() {
        const fishImages = manualFishNames.map(fileName => `assets/${fileName}`);
        addFish(fishImages);
    }

    function addFish(images) {
        for (const imgSrc of images) {
            const fish = document.createElement('div');
            fish.className = 'fish';
            fishContainer.appendChild(fish);

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = 'Fish';
            img.className = 'fish';
            img.classList.add('fish-moving');

            // Determine the movement direction randomly
            const movementDirection = Math.random() > 0.5 ? 'left' : 'right';
            fish.dataset.movementDirection = movementDirection;

            fish.appendChild(img);

            moveFishRandomly(fish);
        }
    }

    function moveFishRandomly(element) {
        let isFishStopped = false;

        function getInitialPosition() {
            const x = Math.random() * (aquariumWidth + element.clientWidth); // Randomize x position
            const y = Math.random() * (aquariumHeight - element.clientHeight);
            return { x, y };
        }
        
        function getRandomPosition() {
            const x = Math.random() * (aquariumWidth + element.clientWidth); // Randomize x position
            const y = Math.random() * (aquariumHeight + element.clientHeight);
            return { x, y };
        }

        // Set the initial position
        const initialPosition = getInitialPosition();
        element.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;

        function animateFish() {
            if (!isFishStopped) {
                const newPosition = getRandomPosition();
                element.classList.add('fish-moving');
                
                // Set random delays for fish animations
                const delayBeforeFloat = Math.random() * 2000; // 0 to 2 seconds
                const delayBeforeMove = Math.random() * 3000; // 0 to 3 seconds
                const respawnDelay = Math.random() * 10000; // 0 to 10 seconds for respawn
                
                // Set up CSS animation for vertical floating
                element.style.animation = `fishFloat 2s infinite alternate ${delayBeforeFloat}ms`;
                
                // Set up CSS animation for horizontal movement
                element.style.transition = `transform 8s linear ${delayBeforeMove}ms`;

                // Calculate the end position based on the fish movement direction
                const endX = (element.dataset.movementDirection === 'left') ? -element.clientWidth : aquariumWidth;
                const endY = newPosition.y;

                // Set the initial position
                element.style.transform = `translate(${endX}px, ${endY}px)`;

                // Trigger next animation after a delay
                setTimeout(() => {
                    // Reset position for the next animation
                    element.style.transition = 'none';
                    
                    if (element.dataset.movementDirection === 'left') {
                        // If left-going fish, become right-going fish
                        element.dataset.movementDirection = 'right';
                    } else {
                        // If right-going fish, become left-going fish
                        element.dataset.movementDirection = 'left';
                    }

                    // Set the initial position
                    element.style.transform = `translate(${endX}px, ${endY}px)`;

                    // Trigger next animation
                    setTimeout(() => {
                        animateFish();
                    }, respawnDelay); // Random respawn delay
                }, 8000); // Move off-screen duration
            }
        }

        // Start the animation after a delay to create a staggered effect
        setTimeout(() => {
            animateFish();
        }, Math.random() * 3000); // Adjust the delay as needed
    }

    // Add fish manually
    addFishManually();
});
