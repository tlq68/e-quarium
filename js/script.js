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
        'Catfish.gif',
        'Catfish flip.gif',
        'Crab.gif',
        'Crab flip.gif',
        'Jelly.gif',
        'Jelly.gif',
        'Lion.gif',
        'Lion flip.gif',
        'Puffer.gif',
        'Puffer flip.gif',
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

            // Determine the movement direction based on the filename
            const movementDirection = imgSrc.endsWith('flip.gif') ? 'right' : 'left';
            fish.dataset.movementDirection = movementDirection;

            fish.appendChild(img);

            moveFishRandomly(fish);
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

    function getRandomFishImage() {
        const randomIndex = Math.floor(Math.random() * manualFishNames.length);
        return manualFishNames[randomIndex];
    }

    // Add fish manually
    addFishManually();
});
