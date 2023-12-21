document.addEventListener('DOMContentLoaded', function () {
    const aquarium = document.getElementById('aquarium');

    function updateAquariumDimensions() {
        aquariumWidth = aquarium.clientWidth;
        aquariumHeight = aquarium.clientHeight;
    }

    // Initial setup
    let aquariumWidth = aquarium.clientWidth;
    let aquariumHeight = aquarium.clientHeight;

    window.addEventListener('resize', updateAquariumDimensions);

    function addFish(imgSrc) {
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

    function moveFishRandomly(element) {
        let isFishStopped = false;

        function getRandomPosition() {
            const x = Math.random() * (aquariumWidth - element.clientWidth);
            const y = Math.random() * (aquariumHeight - element.clientHeight);
            return { x, y };
        }

        function animateFish() {
            if (!isFishStopped) {
                const newPosition = getRandomPosition();
                element.classList.add('fish-moving');
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
