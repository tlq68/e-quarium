// ... (your existing code)

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
  
  function updateFishSelection() {
    console.log('updateFishSelection function called'); // Add this line
    const selectedBorders = document.querySelectorAll('.selected-border');
  
    // Initialize an array to keep track of selected fish names
    const selectedFishNames = [];
  
    selectedBorders.forEach(border => {
      const input = border.querySelector('input');
      if (input) {
        selectedFishNames.push(input.value);
      }
    });
  
    // Update the transformedFishArray based on the selectedFishNames
    transformedFishArray.forEach(fishObject => {
      const fishName = Object.keys(fishObject)[0];
      const isSelected = selectedFishNames.includes(fishName);
      fishObject[fishName][0].selected = isSelected;
    });
  
    // Log the selected fish names for debugging
    console.log('Selected Fish Names:', selectedFishNames);
  
    // Log the transformedFishArray for debugging
    console.log('Transformed Fish Array:', transformedFishArray);
  
    return selectedFishNames;
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
  
    let firstFishTriggered = false;

    async function addFishManually(selectedFishNames, fishArray) {
      for (const fishObject of fishArray) {
          const fishName = Object.keys(fishObject)[0];
          console.log("WE ARE HERE")
          if (selectedFishNames.includes(fishName) && fishObject[fishName][0].selected) {
              const [fishFileName, flipFishFileName] = fishObject[fishName][1].images;
              const images = [`assets/${fishFileName}`, `assets/${flipFishFileName}`];
              await addFish(images[0]);
          }
      }
  }    
  
    function addFish(images) {
        const fish = document.createElement('div');
        fish.className = 'fish';
        fishContainer.appendChild(fish);
  
        const img = document.createElement('img');
        // img.src = imgSrc; testing
        img.src = images
        img.alt = 'Fish';
        img.className = 'fish';
        img.classList.add('fish-moving');
  
        // Determine the movement direction based on the filename
        const movementDirection = images.endsWith('flip.gif') ? 'right' : 'left';
        fish.dataset.movementDirection = movementDirection;
  
        fish.appendChild(img);
  
        moveFishRandomly(fish);
  
        console.log(`Fish created: ${images}`)
      
    }
  
    function addBottomGlidingFishManually() {
      for (const imgSrc of bottomGlidingFish) {
        setTimeout(() => {
          addBottomGlidingFish([`${imgSrc}`]);
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
                
                selectedFishNames = updateFishSelection();
                // Inside the animateFish function, directly use the image source obtained
                const imgSrc = getRandomFishImage(selectedFishNames);

                addFish(imgSrc);

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
  
    function getRandomFishImage(selectedFishNames) {
      // Check if there are selected fish names
      console.log("HERE ARE THE SELECTED FISH: " + selectedFishNames)
      if (selectedFishNames.length > 0) {
          // Get a random fish name from the selected array
          const randomFishName = selectedFishNames[Math.floor(Math.random() * selectedFishNames.length)];
          const fishObjects = transformedFishArray.filter(fishObject => {
              const fishName = Object.keys(fishObject)[0];
              return selectedFishNames.includes(fishName) && fishObject[fishName][0].selected;
          });
  
          if (fishObjects.length > 0) {
              // Get a random fish object from the filtered array
              const randomFishObject = fishObjects[Math.floor(Math.random() * fishObjects.length)];
              const fishName = Object.keys(randomFishObject)[0];
              const images = randomFishObject[fishName][1].images;
  
              // Return a random image from the selected fish
              const randomImageIndex = Math.floor(Math.random() * images.length);
              return `assets/${images[randomImageIndex]}`;
          }
      }
  
      // If no fish is selected or found, return a default fish
      return 'defaultFish.gif'; // Change this to your actual default fish image
  }
  
      
    // Add an event listener to checkboxes to trigger the updateFishSelection function
    const checkboxesContainer = document.getElementById('checkboxes-container');
    checkboxesContainer.addEventListener('change', async function () {
        // Updates fish to be used
        const selectedFishNames = await updateFishSelection();

        if (!firstFishTriggered) {
            // Wait for updateFishSelection before proceeding
            await addFishManually(selectedFishNames, transformedFishArray);
            addBottomGlidingFishManually();
            firstFishTriggered = true;
        }
    });


    // Wait for the initial updateFishSelection before proceeding
    let selectedFishNames = await updateFishSelection();
    console.log("Selected Fish" + [...selectedFishNames])

    // Add regular fish and bottom-gliding fish manually
    addFishManually(selectedFishNames, transformedFishArray);
    addBottomGlidingFishManually();

    // Add Stationary Starfish
    addStationaryStar();
  });
  