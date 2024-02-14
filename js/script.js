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
  selectedFishNames.push(fishObject);
});

// We will likely need to change this when we are finished
export const floatingFish = [...transformedFishArray];

function updateFishSelection() {
  const selectedBorders = document.querySelectorAll('.selected-border');

  // Reset selectedFishNames
  selectedFishNames.length = 0;

  selectedBorders.forEach(border => {
    const input = border.querySelector('input');
    if (input) {
      const fishName = input.value;
      const selectedFishObject = transformedFishArray.find(fishObject => Object.keys(fishObject)[0] === fishName);
      if (selectedFishObject) {
        selectedFishNames.push(selectedFishObject); // Push the entire fish object, not just the name
      }
    }
  });

  // Update the transformedFishArray based on the selectedFishNames
  transformedFishArray.forEach(fishObject => {
    const fishName = Object.keys(fishObject)[0];
    const isSelected = selectedFishNames.some(selectedFishObject => Object.keys(selectedFishObject)[0] === fishName);
    fishObject[fishName].selected = isSelected;
  });

  console.log("Here are the selected fish: ");
  console.log(selectedFishNames);
  return selectedFishNames || transformedFishArray;
}


updateFishSelection();

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
      selectedFishNames = updateFishSelection();
      const fishObject = getRandomFish(selectedFishNames);
      const fishName = fishObject.name;
      // console.log('We are here')
      // console.log("Is this a fish object?: ")
      // console.log(fishObject)
      console.log("Manual testing: ");
      console.log(fishName)
      console.log(selectedFishNames.includes(fishObject))
      
      console.log(fishObject.selected)
      if (selectedFishNames.includes(fishObject) && fishObject[fishName].selected) {
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
    updateFishSelection();
    if (fishObject && fishCounter < maxFishLimit) {
      const randomFishIndex = Math.floor(Math.random() * 2);
      console.log("Images")

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

      moveFishRandomly(fishDiv, fishObject);

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

  function moveFishRandomly(element, fishObject) {
    const aquariumWidth = aquarium.clientWidth;
    const aquariumHeight = aquarium.clientHeight;
    let isFishStopped = false;
  
    // Function to get initial position
    function getInitialPosition(fishObject) {
      let x, y;
  
      // Calculate initial position based on fish type
      if (fishObject.classes.includes('fish')) {
        // Floating Fish positions
        x = (element.dataset.movementDirection === 'left') ? aquariumWidth + element.clientWidth : -element.clientWidth * 2;
        // Adjust the y-coordinate to ensure the fish stays within the desired vertical bounds
        const minY = aquariumHeight * 0.15; // up from the bottom
        const maxY = aquariumHeight * 0.85 - element.clientHeight; // down from the top
        y = Math.random() * (maxY - minY) + minY;
      } else if (fishObject.classes.includes('bottom-gliding-fish')) {
        // Bottom Gliding Fish start at the bottom of the aquarium
        // -- Change this to be the height of the crab image. 
        x = (element.dataset.movementDirection === 'left') ? aquariumWidth + element.clientWidth : -element.clientWidth * 2;
        y = aquariumHeight - element.clientHeight -100; // Adjusted to start at the bottom
      }
      return { x, y };
    }
  
    // Function to get random position
    function getRandomPosition(fishObject) {
      let x, y;
  
      // Calculate random position based on fish type
      if (fishObject.classes.includes('fish')) {
        x = Math.random() * (aquariumWidth + element.clientWidth);
        // Adjust the y-coordinate to ensure the fish stays within the desired vertical bounds
        const minY = aquariumHeight * 0.15; // up from the bottom
        const maxY = aquariumHeight * 0.85 - element.clientHeight; // down from the top
        y = Math.random() * (maxY - minY) + minY;
      } else if (fishObject.classes.includes('bottom-gliding-fish')) {
        x = Math.random() * (aquariumWidth + element.clientWidth);
        y = aquariumHeight - element.clientHeight; // Adjusted to stay at the bottom
      }
      return { x, y };
    }
  
    // Get initial position
    const initialPosition = getInitialPosition(fishObject);
    element.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;
  
    function animateFish() {
      // Check if fish movement is stopped
      if (!isFishStopped) {
        const newPosition = getRandomPosition(fishObject);
        const initialPosition = getInitialPosition(fishObject);
        element.classList.add('fish-moving');
  
        // Set random delays
        const delayBeforeFloat = Math.random() * 2000;
        const delayBeforeMove = Math.random() * 500;
        const respawnDelay = Math.random() * 5000;
        const aquariumWidthFactor = aquariumWidth / 500; // Adjust this factor based on your preference
  
        // Set animation and transition properties based on fish type
        if (fishObject.classes.includes('fish')) {
          element.style.animation = `fishFloat ${2 * aquariumWidthFactor}s infinite alternate ${delayBeforeFloat}ms`;
        }
        element.style.transition = `transform ${8 * aquariumWidthFactor}s linear ${delayBeforeMove}ms`;
  
        // Calculate end position
        const distanceMultiplier = 2;
        const endX = (element.dataset.movementDirection === 'left') ? -element.clientWidth * distanceMultiplier : aquariumWidth + element.clientWidth;
        const endY = fishObject.classes.includes('fish') ? newPosition.y : initialPosition.y;
        element.style.transform = `translate(${endX}px, ${endY}px)`;
  
        element.addEventListener('transitionend', function handleTransitionEnd(event) {
          if (event.propertyName === 'transform') {
            element.style.transition = 'none';
  
            // Flip the fish if it reaches the end of the aquarium
            if (element.dataset.movementDirection === 'left' && endX <= -element.clientWidth * distanceMultiplier) {
              element.dataset.movementDirection = 'right';
            } else if (element.dataset.movementDirection === 'right' && endX >= aquariumWidth + element.clientWidth) {
              element.dataset.movementDirection = 'left';
            }
  
            element.style.transform = `translate(${endX}px, ${endY}px)`;
  
            setTimeout(() => {
              element.removeEventListener('transitionend', handleTransitionEnd);
              fishContainer.removeChild(element);
  
              // Update selected fish names and fish counter
              selectedFishNames = updateFishSelection();
              const difference = maxFishLimit - fishCounter;
              for (let i = 0; i < difference; i++) {
                const imgSrc = getRandomFish(selectedFishNames);
                addFish(imgSrc);
              }
              fishCounter--;
  
            }, respawnDelay);
          }
        }, { once: true });
      }
    }
  
    // Start fish movement animation
    setTimeout(() => {
      animateFish();
    }, Math.random() * 3000);
  }
  

  function getRandomFish(selectedFishNames) {
    selectedFishNames = updateFishSelection();
    // Check if there are selected fish names
    if (selectedFishNames.length > 0) {
        const fishObjects = transformedFishArray.filter(fishObject => {
          const fishName = Object.keys(fishObject)[0]
          // console.log("Random Check:" + fishName)
          // console.log(fishObject)
          // console.log(selectedFishNames)
          // console.log(selectedFishNames.includes(fishObject))
          // console.log(fishObject[fishName].selected)
            return selectedFishNames.includes(fishObject) && fishObject[fishName].selected;
        });
        console.log("Are these random fish objects? :" + fishObjects)
        if (fishObjects.length > 0) {
            // Get a random fish object from the filtered array
            const randomFishObject = fishObjects[Math.floor(Math.random() * fishObjects.length)];
            const fishName = Object.keys(randomFishObject)[0];
            console.log("Rando: ")
            console.log(randomFishObject[fishName])
            updateFishSelection();
            return randomFishObject[fishName];
        }
    }

    // If no fish is selected or found, return null
    console.log("There are no fish to add")
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
    selectedFishNames = updateFishSelection();
    // Update the maxFishLimit when the slider value changes
    maxFishLimit = parseInt(this.value);
    addFishManually(selectedFishNames, transformedFishArray);
  });
  
  function initialFish() {
    transformedFishArray.forEach(fishObject => {
      const fish = Object.keys(fishObject)[0];
      addFish(fishObject[fish]);
    });
  }
  
  initialFish();

  // Add Stationary Starfish
  addStationaryStar();
});
