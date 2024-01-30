//script.js

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
    'Jelly flip.gif',
    'Lion.gif',
    'Lion flip.gif',
    'Puffer.gif',
    'Puffer flip.gif'
];

export const transformedFishArray = [];

for (let i = 0; i < manualFishNames.length; i += 2) {
  const fishName = manualFishNames[i];
  const flipFishName = manualFishNames[i + 1];

  const fishObject = {};
  fishObject[fishName] = [
    { 'selected': true },
    { 'images': [fishName, flipFishName] }
  ];

  transformedFishArray.push(fishObject);
}
  
  console.log(transformedFishArray);

  transformedFishArray.forEach((fishObject) => {
    const fishName = Object.keys(fishObject)[0];
    const images = fishObject[fishName][1].images;

    console.log(`Fish: ${fishName}`);
    console.log(`Images: ${images.join(', ')}`);
    console.log('----');
  })

// Controls fish behavior
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

    const bottomGlidingFish = [
        'Crab.gif',
        'Crab flip.gif'
    ];

    function addFishManually() {
        transformedFishArray.forEach((fishObject) => {
          const fishName = Object.keys(fishObject)[0];
          const images = fishObject[fishName][1].images.map(fileName => `assets/${fileName}`);
          addFish(images);
        });
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

    function addBottomGlidingFishManually() {
        for (const imgSrc of bottomGlidingFish) {
            setTimeout(() => {
                addBottomGlidingFish([`assets/${imgSrc}`]);
            }, Math.random() * 5000); // Adjust the time interval (in milliseconds) based on your preference
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

    function addStationaryStar() {
        const star = document.createElement('div');
        star.className = 'stationary-star';
        fishContainer.appendChild(star);

        const img = document.createElement('img');
        img.src = 'assets/Star.gif'; // Replace with the actual path to the Star.gif image
        img.alt = 'Star';
        img.className = 'stationary-star-img';

        // Set random position for the star
        const starPosition = getRandomStarPosition();
        star.style.position = 'absolute';
        star.style.left = `${starPosition.x}px`;
        star.style.top = `${starPosition.y}px`;

        // Set z-index for the star
        star.style.zIndex = '11';

        star.appendChild(img);
    }

    function getRandomStarPosition() {
        const x = Math.random() * (aquariumWidth - 50); // Adjusted to stay within the aquarium width
        const y = Math.random() * (aquariumHeight - 50); // Adjusted to stay within the aquarium height
        return { x, y };
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
                const respawnDelay = Math.random() * 5000;

                const aquariumWidthFactor = aquariumWidth / 500; // Adjust this factor based on your preference

        element.style.animation = `fishFloat ${2 * aquariumWidthFactor}s infinite alternate ${delayBeforeFloat}ms`;
        element.style.transition = `transform ${8 * aquariumWidthFactor}s linear ${delayBeforeMove}ms`;
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
                const respawnDelay = Math.random() * 7000;
        
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
    addBottomGlidingFishManually();

    //Add Stationary Starfish
    addStationaryStar();
});