// script.js

// Manually input fish names
const manualFishNames = [
  ['Algae.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Algae.gif?raw=true"],
  ['Algae flip.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Algae%20flip.gif?raw=true"],
  ['Angel.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Angel.gif?raw=true"],
  ['Angel flip.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Angel%20flip.gif?raw=true"],
  ['Angler.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Angler.gif?raw=true"],
  ['Angler flip.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Angler%20flip.gif?raw=true"],
  ['Blue.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Blue.gif?raw=true"],
  ['Blue flip.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Blue%20flip.gif?raw=true"],
  ['Catfish.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Catfish.gif?raw=true"],
  ['Catfish flip.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Catfish%20flip.gif?raw=true"],
  ['Jelly.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Jelly.gif?raw=true"],
  ['Jelly flip.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Jelly%20flip.gif?raw=true"],
  ['Lion.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Lion.gif?raw=true"],
  ['Lion flip.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Lion%20flip.gif?raw=true"],
  ['Puffer.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Puffer.gif?raw=true"],
  ['Puffer flip.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Puffer%20flip.gif?raw=true"]
];

// Manually input bottom gliding fish names
const bottomGlidingFishWithURL = [
  'Crab.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Crab.gif?raw=true",
  'Crab flip.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Crab%20flip.gif?raw=true"
];

const transformedFishArray = [];
let selectedFishArraysEmpty = false;

// Loop for regular fish
for (let i = 0; i < manualFishNames.length; i += 2) {
  const fishName = manualFishNames[i][0]; // Get the fish name from the subarray
  const imageUrl = manualFishNames[i][1]; // Get the URL from the subarray
  const flipFishName = manualFishNames[i + 1][0]; // Get the flip fish name from the next subarray
  const flipImageUrl = manualFishNames[i + 1][1]; // Get the flip image URL from the next subarray

  const fishObject = {};
  fishObject[fishName] = {
    'name': fishName,
    'selected': true,
    'images': [fishName, flipFishName],
    'url': imageUrl,
    'flipUrl': flipImageUrl,
    'classes': ['fish', 'fish-moving']
  };

  transformedFishArray.push(fishObject);
}


const crabFishObject = {
  'Crab.gif': [
      { 'selected': true },
      { 'images': ['Crab.gif', 'Crab flip.gif'] }
  ]
};

const bottomGlidingFish = [
  ['Crab.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Crab.gif?raw=true"],
  ['Crab flip.gif', "https://github.com/tlq68/e-quarium/blob/main/assets/Crab%20flip.gif?raw=true"]
]

// Loop for Crab fish
for (let i = 0; i < bottomGlidingFish.length; i += 2) {
  const fishName = bottomGlidingFish[i][0]; // Get the fish name from the subarray
  const imageUrl = bottomGlidingFish[i][1]; // Get the URL from the subarray
  const flipFishName = bottomGlidingFish[i + 1][0]; // Get the flip fish name from the next subarray
  const flipImageUrl = bottomGlidingFish[i + 1][1]; // Get the flip image URL from the next subarray

  const fishObject = {};
  fishObject[fishName] = {
    'name': fishName,
    'selected': true,
    'images': [fishName, flipFishName],
    'url': imageUrl,
    'flipUrl': flipImageUrl,
    'classes': ['bottom-gliding-fish', 'bottom-gliding-fish-img']
  };

  transformedFishArray.push(fishObject);
}

const selectedFishNames = [];

transformedFishArray.forEach(fishObject => {
  const fishName = Object.keys(fishObject)[0];
  fishObject[fishName].selected = true;
  selectedFishNames.push(fishName);
});
  
// We will likely need to change this when we are finished
export const floatingFish = [...transformedFishArray];

function updateFishSelection() {
  const selectedBorders = document.querySelectorAll('.selected-border');

  selectedBorders.forEach(border => {
      const input = border.querySelector('input');
      if (input && !selectedFishNames.includes(input.value)) {
          selectedFishNames.push(input.value);
      }
  });

  // Update the transformedFishArray based on the selectedFishNames
  transformedFishArray.forEach(fishObject => {
      const fishName = Object.keys(fishObject)[0];
      const isSelected = selectedFishNames.includes(fishName);
      fishObject[fishName].selected = isSelected;
  });

  return selectedFishNames;
}


// transformedFishArray.forEach((fishObject) => {
//   const fishName = Object.keys(fishObject)[0];
//   const images = fishObject[fishName][1].images;

//   console.log(`Fish: ${fishName}`);
//   console.log(`Images: ${images.join(', ')}`);
//   console.log('----');
// })

// Controls fish behavior
document.addEventListener('DOMContentLoaded', async function () {
  const aquarium = document.getElementById('aquarium');
  const fishContainer = document.getElementById('fish-container');

  let selectedFishNames = await updateFishSelection();

  let fishCounter = 0;
  let maxFishLimit = 10;

  function updateAquariumDimensions() {
    aquariumWidth = aquarium.clientWidth;
    aquariumHeight = aquarium.clientHeight;
  }

  // Initial setup
  let aquariumWidth = aquarium.clientWidth;
  let aquariumHeight = aquarium.clientHeight;

  window.addEventListener('resize', updateAquariumDimensions);

  let firstFishTriggered = false;

  async function addFishManually(selectedFishNames, fishArray) {
    for (let i = 0; i < maxFishLimit || (maxFishLimit === 0 && i === 0); i++) {
      // Randomly select a fish from the available ones
      const fishObject = getRandomFish(selectedFishNames);
      const fishName = Object.keys(fishObject)[0];
  
      if (selectedFishNames.includes(fishName) && fishObject[fishName].selected) {
        const [fishFileName, flipFishFileName] = [fishObject[fishName].url, fishObject[fishName].flipUrl];
        console.log('HERE IN THE FAST LANE: ' + fishFileName, flipFishFileName)
        // Check if the fishCounter is below the maximum limit
        if (fishCounter < maxFishLimit) {
          console.log("fishCounter" + fishCounter);
          console.log("maxLimite" + maxFishLimit)
          const randomDelay = Math.floor(Math.random() * 15) * 1000;
          await new Promise(resolve => setTimeout(resolve, randomDelay)); 
          selectedFishNames = updateFishSelection(); 
          const randomFish = getRandomFish(selectedFishNames);       
          await addFish(randomFish);
        } else {
          console.log('Maximum fish limit reached. Cannot add more fish.');
          break; // Exit the loop if the maximum limit is reached
        }
      }
    }
  }

  function addFish(fishObject) {
    if (fishObject && fishCounter < maxFishLimit) {
      const fish = Object.keys(fishObject)[0];
      const randomFishIndex = Math.floor(Math.random() * 2);
      const fishName = fishObject.images[randomFishIndex];
      console.log(fishName)
      const fishDiv = document.createElement('div');

      fishDiv.className = fishObject.classes[0];
      fishContainer.appendChild(fishDiv);

      const img = document.createElement('img');
      img.src = fishName.endsWith('flip.gif') ? fishObject.flipUrl : fishObject.url;
      img.alt = 'Fish';
      img.className = fishObject.classes[0];
      img.classList.add(fishObject.classes[1]);

      // Determine the movement direction based on the filename
      const movementDirection = fishName.endsWith('flip.gif') ? 'right' : 'left';
      fishDiv.dataset.movementDirection = movementDirection;

      fishDiv.appendChild(img);
      
      // Set a random z-index between 1 and 10
      const randomIndex = Math.floor(Math.random() * 10) + 1;
      fishDiv.style.zIndex = randomIndex;

      moveFishRandomly(fishDiv);

      fishCounter++;
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

    const minHeightAdjustment = 0.15;
    const maxHeightAdjustment = 0.85;
    
    function getInitialPosition() {
      const x = (element.dataset.movementDirection === 'left') ? aquariumWidth + element.clientWidth : -element.clientWidth * 2;
      
      // Adjust the y-coordinate to ensure the fish stays within the desired vertical bounds
      const minY = aquariumHeight * minHeightAdjustment; // up from the bottom
      const maxY = aquariumHeight * maxHeightAdjustment - element.clientHeight; // down from the top
      const y = Math.random() * (maxY - minY) + minY;
  
      return { x, y };
    }
  
    function getRandomPosition() {
      const x = Math.random() * (aquariumWidth + element.clientWidth);
  
      // Adjust the y-coordinate to ensure the fish stays within the desired vertical bounds
      const minY = aquariumHeight * minHeightAdjustment; // up from the bottom
      const maxY = aquariumHeight * maxHeightAdjustment - element.clientHeight; // down from the top
      const y = Math.random() * (maxY - minY) + minY;
  
      return { x, y };
    }
  
    const initialPosition = getInitialPosition();
    element.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;

    function animateFish() {
      if (!isFishStopped) {
        const newPosition = getRandomPosition();
        element.classList.add('fish-moving');

        const delayBeforeFloat = Math.random() * 2000;
        const delayBeforeMove = Math.random() * 500;
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
              
              selectedFishNames = updateFishSelection();
              
              
              console.log("Add fish: " + fishCounter)
              // Calculate the difference between fishCounter and maxFishLimit
              const difference = maxFishLimit - fishCounter;
              
              // Call addFish the corresponding number of times
              for (let i = 0; i < difference; i++) {
                // Inside the animateFish function, directly use the image source obtained
                const imgSrc = getRandomFish(selectedFishNames);
                console.log('right before disaster?' + imgSrc)
                addFish(imgSrc);
              }

              fishCounter--; // Adjust the fishCounter

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
  
              let imgSrc = bottomGlidingFish[Math.floor(Math.random() * bottomGlidingFish.length)];
              console.log("imgSrc" + imgSrc)
              updateFishSelection();
              // addBottomGlidingFish(imgSrc);

            }, respawnDelay);
          }
        }, { once: true });
      }
    }
  
    setTimeout(() => {
      animateBottomGlidingFish();
    }, Math.random() * 3000);
  }    

  function getRandomFish(selectedFishNames) {
    // Check if there are selected fish names
    if (selectedFishNames.length > 0) {
        const fishObjects = transformedFishArray.filter(fishObject => {
            const fishName = Object.keys(fishObject)[0];
            return selectedFishNames.includes(fishName) && fishObject[fishName].selected;
        });

        if (fishObjects.length > 0) {
            // Get a random fish object from the filtered array
            const randomFishObject = fishObjects[Math.floor(Math.random() * fishObjects.length)];
            const fishName = Object.keys(randomFishObject)[0];
            return randomFishObject[fishName];
        }
    }
    // If no fish is selected or found, return null
    console.log("There are no fish to add")
    return null;
}

  // Add an event listener to checkboxes to trigger the updateFishSelection function
  const checkboxesContainer = document.getElementById('checkboxes-container');
  checkboxesContainer.addEventListener('change', async function () {
      // Updates fish to be used
      let selectedFishNames = updateFishSelection();
    
      // Wait for updateFishSelection before proceeding
      addFishManually(selectedFishNames, transformedFishArray);
      
      // Check if selectedFishNames is empty and if not, call addFishManually and addBottomGlidingFishManually
      if (selectedFishNames.length > 0) {
          if (selectedFishArraysEmpty) {
            selectedFishArraysEmpty = false; // Reset the flag
          }
      } else {
          fishCounter = maxFishLimit;
          selectedFishArraysEmpty = true; // Set the flag
      }
  });

  // Add an event listener to the fishLimitSlider
  const fishLimitSlider = document.getElementById('fishLimitSlider');

  fishLimitSlider.addEventListener('input', function () {
    // Update the maxFishLimit when the slider value changes
    maxFishLimit = parseInt(this.value);
    // This sort of works, but addFishManually is still going left.
    addFishManually(selectedFishNames, transformedFishArray);
  });
  
  function initialFish() {
    transformedFishArray.forEach(fishObject => {
      const fish = Object.keys(fishObject)[0];
      addFish(fishObject[fish]);
    });
  }
  
  initialFish();

  // Wait for the initial updateFishSelection before proceeding
  selectedFishNames = await updateFishSelection();

  // Add regular fish and bottom-gliding fish manually
  addFishManually(selectedFishNames, transformedFishArray);

  // Add Stationary Starfish
  addStationaryStar();
});
