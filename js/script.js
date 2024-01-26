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
        'Algae.gif',
        'Algae flip.gif',
        'Angel.gif',
        'Angel flip.gif',
        'Angler.gif',
        'Angler flip.gif',
        'Blue.gif',
        'Blue flip.gif',
        'Catfish.gif',
        'Catfish flip.gif',
        'Jelly.gif',
        'Jelly.gif',
        'Lion.gif',
        'Lion flip.gif',
        'Puffer.gif',
        'Puffer flip.gif',
    ];

    const bottomGlidingFish = [
        'Crab.gif',
        'Crab flip.gif'
    ];

    function addFishManually() {
        const fishImages = manualFishNames.map(fileName => `assets/${fileName}`);
        addFish(fishImages);
        addBottomGlidingFish(bottomGlidingFish);
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

            // Determine the movement direction based on the filename
            const movementDirection = imgSrc.endsWith('flip.gif') ? 'right' : 'left';
            fish.dataset.movementDirection = movementDirection;

            fish.appendChild(img);

            moveFishRandomly(fish);
        }
    }

    function addBottomGlidingFish(images) {
        for (const imgSrc of images) {
            const crab = document.createElement('div');
            crab.className = 'bottom-gliding-fish'; // Use a class for bottom-gliding fish
            fishContainer.appendChild(crab);

            const img = document.createElement('img');
            img.src = `assets/${imgSrc}`;
            img.alt = 'Crab';
            img.className = 'bottom-gliding-fish-img'; // Use a separate class for styling bottom-gliding fish

            // Determine the movement direction based on the filename
            const movementDirection = imgSrc.endsWith('flip.gif') ? 'right' : 'left';
            crab.dataset.movementDirection = movementDirection;

            crab.appendChild(img);

            moveBottomGlidingFish(crab);
        }
    }

    function moveFishRandomly(element) {
        let isFishStopped = false;

        function getInitialPosition() {
            const x = (element.dataset.movementDirection === 'left') ? aquariumWidth + element.clientWidth : -element.clientWidth * 2;
            const y = Math.random() * (aquariumHeight - element.clientHeight);
            return { x, y };
        }

        function getRandomPosition() {
            const x = Math.random() * (aquariumWidth + element.clientWidth);
            const y = Math.random() * (aquariumHeight + element.clientHeight);
            return { x, y };
        }

        const initialPosition = getInitialPosition();
        element.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;

        function animateFish() {
            if (!isFishStopped) {
                const newPosition = getRandomPosition();
                element.classList.add('fish-moving');

                const delayBeforeFloat = Math.random() * 2000;
                const delayBeforeMove = Math.random() * 3000;
                const respawnDelay = Math.random() * 2000;

                element.style.animation = `fishFloat 2s infinite alternate ${delayBeforeFloat}ms`;
                element.style.transition = `transform 8s linear ${delayBeforeMove}ms`;

                const distanceMultiplier = 1.3;
                const endX = (element.dataset.movementDirection === 'left') ? -element.clientWidth * 2 : aquariumWidth + element.clientWidth;
                const endY = newPosition.y;

                element.style.transform = `translate(${endX}px, ${endY}px)`;

                element.addEventListener('transitionend', function handleTransitionEnd(event) {
                    if (event.propertyName === 'transform') {
                        element.style.transition = 'none';

                        // Flip the fish if it reaches the end of the aquarium
                        if (element.dataset.movementDirection === 'left' && endX <= -element.clientWidth * 2) {
                            element.dataset.movementDirection = 'right';
                        } else if (element.dataset.movementDirection === 'right' && endX >= aquariumWidth + element.clientWidth) {
                            element.dataset.movementDirection = 'left';
                        }

                        element.style.transform = `translate(${endX}px, ${endY}px)`;

                        setTimeout(() => {
                            element.removeEventListener('transitionend', handleTransitionEnd);
                            fishContainer.removeChild(element);
                            addFish([`assets/${getRandomFishImage()}`]);
                        }, respawnDelay);
                    }
                }, { once: true });
            }
        }

        setTimeout(() => {
            animateFish();
        }, Math.random() * 3000);
    }

    function moveBottomGlidingFish(element) {
        let isFishStopped = false;
    
        function getInitialPosition() {
            const x = (element.dataset.movementDirection === 'left') ? aquariumWidth + element.clientWidth : -element.clientWidth * 2;
            const y = aquariumHeight - element.clientHeight + 20; // Adjusted to start at the bottom
            return { x, y };
        }
    
        function getRandomPosition() {
            const x = Math.random() * (aquariumWidth + element.clientWidth);
            const y = aquariumHeight - element.clientHeight; // Adjusted to stay at the bottom
            return { x, y };
        }
    
        const initialPosition = getInitialPosition();
        element.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;
    
        function animateBottomGlidingFish() {
            if (!isFishStopped) {
                const newPosition = getRandomPosition();
        
                const delayBeforeMove = Math.random() * 3000;
                const respawnDelay = Math.random() * 2000;
        
                element.style.transition = `transform 8s linear ${delayBeforeMove}ms`;
        
                const distanceMultiplier = 1.3;
                const endX = (element.dataset.movementDirection === 'left') ? -element.clientWidth * 2 : aquariumWidth + element.clientWidth;
                const endY = initialPosition.y; // Set endY to the initial Y position
        
                element.style.transform = `translate(${endX}px, ${endY}px)`;
        
                element.addEventListener('transitionend', function handleTransitionEnd(event) {
                    if (event.propertyName === 'transform') {
                        element.style.transition = 'none';
        
                        // Flip the fish if it reaches the end of the aquarium
                        if (element.dataset.movementDirection === 'left' && endX <= -element.clientWidth * 2) {
                            element.dataset.movementDirection = 'right';
                        } else if (element.dataset.movementDirection === 'right' && endX >= aquariumWidth + element.clientWidth) {
                            element.dataset.movementDirection = 'left';
                        }
        
                        element.style.transform = `translate(${endX}px, ${endY}px)`;
        
                        setTimeout(() => {
                            element.removeEventListener('transitionend', handleTransitionEnd);
                            fishContainer.removeChild(element);
                            addBottomGlidingFish([`${bottomGlidingFish[Math.floor(Math.random() * 2)]}`]);
                        }, respawnDelay);
                    }
                }, { once: true });
            }
        }

        setTimeout(() => {
            animateBottomGlidingFish();
        }, Math.random() * 3000);
    }

    function getRandomFishImage() {
        const randomIndex = Math.floor(Math.random() * manualFishNames.length);
        return manualFishNames[randomIndex];
    }

    // Add regular fish and bottom-gliding fish manually
    addFishManually();
});