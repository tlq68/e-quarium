document.addEventListener('DOMContentLoaded', async function () {
    const aquarium = document.getElementById('aquarium');

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
            aquarium.appendChild(fish);

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = 'Fish';
            img.className = 'fish';
            img.classList.add('fish-moving');

            fish.appendChild(img);

            moveFishRandomly(fish);
        }
    }

    function moveFishRandomly(element) {
        let isFishStopped = false;

        function getRandomPosition() {
            const x = aquariumWidth; // Start from the right side
            const y = Math.random() * aquariumHeight;
            return { x, y };
        }

        // Set the initial position
        const initialPosition = getRandomPosition();
        element.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;

        function animateFish() {
            if (!isFishStopped) {
                const newPosition = getRandomPosition();
                element.classList.add('fish-moving');

                // Set up CSS animation for vertical floating and horizontal movement
                element.style.animation = `
                    fishFloat 4s infinite alternate,
                    moveFish 8s linear
                `; // Adjust the durations as needed

                // Set up CSS animation for horizontal movement
                element.style.transition = 'transform 8s linear'; // Adjust the duration as needed
                element.style.transform = `translate(-${element.clientWidth}px, ${newPosition.y}px)`;

                // Reset position for the next animation
                setTimeout(() => {
                    element.style.transition = 'none';
                    element.style.transform = `translate(${aquariumWidth}px, ${newPosition.y}px)`;

                    // Trigger next animation
                    setTimeout(() => {
                        animateFish();
                    }, 1000); // Adjust the delay as needed
                }, 8000); // Adjust the duration as needed
            }
        }

        animateFish();
    }

    // Add fish manually
    addFishManually();
});
