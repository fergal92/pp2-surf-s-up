document.getElementById('surfForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get the form data
    const firstName = document.getElementById('first-name').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;

     // Save the data to localStorage
     localStorage.setItem('firstName', firstName);
     localStorage.setItem('height', height);
     localStorage.setItem('weight', weight);

    // Calculate surfboard size for the current user
    const surfboardSizes = calculateSurfboardSize(height, weight); 

    // Hide the form
    document.getElementById('data-input').style.display = 'none';

    // Show the surf game
    document.getElementById('surf-game-container').style.display = 'block';

    // Optionally, you can display a confirmation message or redirect to another page
    alert(`Hi ${firstName}! Let's go surfing! Your surfboard sizes based on your height and weight will be: Beginner - ${surfboardSizes.beginner}, Intermediate - ${surfboardSizes.intermediate}, Advanced - ${surfboardSizes.advanced}`); 
});

// Calculate surfboard size for each category
function calculateSurfboardSize(height, weight) {
    let surfboardSize;
    const heightWeightRatio = height / weight;

    // Calculate beginner surfboard size
    if (heightWeightRatio < 2) {
        surfboardSize = '10ft';
    } else if (heightWeightRatio >= 2 && heightWeightRatio < 3) {
        surfboardSize = '9ft';
    } else {
        surfboardSize = '8ft';
    }

    // Intermediate and Advanced surfboard sizes based on beginner surfboard size
    let intermediateSurfboardSize;
    let advancedSurfboardSize;

    switch (surfboardSize) {
        case '10ft':
            intermediateSurfboardSize = '9ft';
            advancedSurfboardSize = '8ft';
            break;
        case '9ft':
            intermediateSurfboardSize = '8ft';
            advancedSurfboardSize = '7ft';
            break;
        case '8ft':
            intermediateSurfboardSize = '7ft';
            advancedSurfboardSize = '6ft';
            break;
        default:
            intermediateSurfboardSize = '7ft';
            advancedSurfboardSize = '6ft';
            break;
    }

    return { beginner: surfboardSize, intermediate: intermediateSurfboardSize, advanced: advancedSurfboardSize };
}


const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const surfboardImage = document.getElementById('surfboard-image');
const surfSpotImage = document.getElementById('surfspot-image');
const surfGif = document.getElementById('surf-gif')
const beginnerAudio = document.getElementById('beginner-audio');
const intermediateAudio = document.getElementById('intermediate-audio');
const advancedAudio = document.getElementById('advanced-audio');

// Text based game
console.log('hello')
// console.log(surfboardSize);
let state = {}
let currentAudio = null;
let currentSurfboardState = '';

/**
 * Starts the game
 */
function startGame(){
    stopAllAudio();
    state = {
        surfboard: 'beginner surfboard',
        surfSpot: 'beginner surf spot',
        surfGif: ''
    } ;
    updateAudio();
    showTextNode(1)
}

/**
 * Updates the surboard and surf spot images depending on surf level
 */
function updateImages() {
    const surfboardSizeText = document.getElementById('surfboard-size-text');
    const surfSpotLocationText = document.getElementById('surfspot-location-text');


    if (state.surfboard === 'beginner surfboard') {
        surfboardImage.src = "assets/images/longboard.jpg"; // Path to beginner surfboard image
        surfboardSizeText.innerText = 'Surfboard Size: 10ft';
    } else if (state.surfboard === 'intermediate surfboard') {
        surfboardImage.src = 'assets/images/midlength-intermediate.jpg'; // Path to intermediate surfboard image
        surfboardSizeText.innerText = 'Surfboard Size: 9ft';
    } else if (state.surfboard === 'advanced surfboard') {
        surfboardImage.src = 'assets/images/shortboard-advanced.jpg'; // Path to advanced surfboard image
        surfboardSizeText.innerText = 'Surfboard Size: 8ft';
    }

    if (state.surfSpot === 'beginner surf spot') {
        surfSpotImage.src = 'assets/images/inch-beach-beginner.jpg'; // Path to beginner surf spot image
        surfSpotLocationText.innerText = 'Surf Spot: Beginner Spot';
    } else if (state.surfSpot === 'intermediate surf spot') {
        surfSpotImage.src = 'assets/images/strandhill-intermediate.jpg'; // Path to intermediate surf spot image
        surfSpotLocationText.innerText = 'Surf Spot: Intermediate Spot';
    } else if (state.surfSpot === 'advanced surf spot') {
        surfSpotImage.src = 'assets/images/pmpa-advanced.jpg'; // Path to advanced surf spot image
        surfSpotLocationText.innerText = 'Surf Spot: Advanced Spot';
    }

    if (state.surfAction === 'paddle out') {
        surfGif.src = 'assets/images/paddle-out.gif';
    } else if(state.surfAction === 'wipeout'){
        surfGif.src = 'assets/images/wipeout.gif';
    } else if(state.surfAction === 'surfing beginner'){
        surfGif.src = 'assets/images/surfing-beginner.gif';
    } else if(state.surfAction === 'surfing intermediate'){
        surfGif.src = 'assets/images/surfing-intermediate.gif';
    } else if(state.surfAction === 'surfing advanced'){
        surfGif.src = 'assets/images/surfing-advanced.gif';
    } else if(state.surfAction === 'surf travel'){
        surfGif.src = 'assets/images/surfing-travel.gif';
    } else if(state.surfAction === 'turtle roll'){
        surfGif.src = 'assets/images/turtle-roll.gif';
    } else if(state.surfAction === 'duck dive'){
        surfGif.src = 'assets/images/duck-dive.gif';
    } else if(state.surfAction === 'take break'){
        surfGif.src = 'assets/images/take-break.gif';
    } else if(state.surfAction === 'break board'){
        surfGif.src = 'assets/images/broken-board.gif';
    } else if(state.surfAction === 'bottom turn'){
        surfGif.src = 'assets/images/bottom-turn.gif';
    } else if(state.surfAction === 'pop up'){
        surfGif.src = 'assets/images/pop-up.gif';
    }
}

/**
 * Shows the text at the selected stage of the game
 */
function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

/** 
* Checks if an option should be shown
*/
function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

/**
 * Selects the current game option
 */
function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    const newState = Object.assign({}, state, option.setState);
    if (newState.surfboard && newState.surfboard !== currentSurfboardState) {
        currentSurfboardState = newState.surfboard;
        playAudio(newState.surfboard);
    }
    state = newState;
    updateImages();
    showTextNode(nextTextNodeId);

    // Check if it's the end of the game
    if (nextTextNodeId === 16 && option.text === 'Finish game') {
        // Show alert message
        alert('Congratulations! You have completed the game. Go out and surf for real now you are ready!');

        // Reload the page to start again
        window.location.href = 'index.html';
    }
}


/**
 * play appropriate audio based on surfboard state
 */
function playAudio(board) {
    stopAllAudio();
    if (board === 'beginner surfboard') {
        beginnerAudio.play();
    } else if (board === 'intermediate surfboard') {
        intermediateAudio.play();
    } else if (board === 'advanced surfboard') {
        advancedAudio.play();
    }
}

function updateAudio() {
    playAudio(state.surfboard);
}
/**
 * Stops all audio
 */
function stopAllAudio() {
    beginnerAudio.pause();
    beginnerAudio.currentTime = 0;
    intermediateAudio.pause();
    intermediateAudio.currentTime = 0;
    advancedAudio.pause();
    advancedAudio.currentTime = 0;
}

// Text nodes array
const textNodes = [
    {
        id: 1,
        text: 'The surf looks good, do you want to paddle out?',
        options: [
            {
                text: 'Paddle out',
                setState: { surfboard: 'beginner surfboard', surfSpot: 'beginner surf spot', surfAction: 'paddle out' },
                nextText: 2
            },
        ]
    },
    {
        id: 2,
        text: 'You see a big wave approaching. What do you do?',
        options: [
            {
                text: 'Catch the wave',
                setState: { surfAction: 'surfing beginner' },
                nextText: 3
            },
            {
                text: 'Avoid the wave with a turtle roll',
                setState: { surfAction: 'turtle roll' },
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: 'You caught the wave and had an amazing ride! You pass the beginner level!',
        options: [
            {
                text: 'Continue to intermediate level',
                setState: { surfAction: 'surf travel' },
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'You executed the turtle roll perfectly to avoid the wave.',
        options: [
            {
                text: 'Continue surfing',
                setState: { surfAction: 'paddle out' },
                nextText: 2
            },
            {
                text: 'Return to beach',
                setState: { surfAction: '' },
                nextText: 1
            }
        ]
    },
    {
        id: 6,
        text: 'Welcome to the intermediate level! Ready for more challenges?',
        options: [
            {
                text: 'Yes, bring it on!',
                setState: { surfboard: 'intermediate surfboard', surfSpot: 'intermediate surf spot', surfAction: 'surf travel' },
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'You are now at the intermediate level. Face new waves and enjoy!',
        options: [
            {
                text: 'Paddle out',
                setState: { surfAction: 'paddle out' },
                nextText: 8
            },
            {
                text: 'Take a break',
                setState: { surfAction: 'take break' },
                nextText: 6
            }
        ]
    },
    {
        id: 8,
        text: 'You see a big wave approaching. What do you do?',
        options: [
            {
                text: 'Catch the wave',
                setState: { surfAction: 'pop up' },
                nextText: 9
            },
            {
                text: 'Avoid the wave with a duck dive',
                setState: { surfAction: 'duck dive' },
                nextText: 10
            }
        ]
    },
    {
        id: 9,
        text: 'You caught the wave and popped up, now What do you do?',
        options: [
            {
                text: 'Attempt a cut back?',
                setState: { surfAction: 'wipeout' },
                nextText: 11
            },
            {
                text: 'Attempt a bottom turn?',
                setState: { surfAction: 'bottom turn' },
                nextText: 12
            }
        ]
    },
    {
        id: 10,
        text: 'You executed the duck dive perfectly to avoid the wave.',
        options: [
            {
                text: 'Continue surfing',
                setState: { surfAction: 'paddle out' },
                nextText: 8
            },
            {
                text: 'Return to beach',
                setState: { surfAction: '' },
                nextText: 6
            }
        ]
    },
    {
        id: 11,
        text: 'You missed the cut back, fell off the board and got caught inside a set of breaking waves, only one thing to do!',
        options: [
            {
                text: 'Duck dive the wave',
                setState: { surfAction: 'duck dive' },
                nextText: 10
            },
        ]
    },
    {
        id: 12,
        text: 'You pulled off the bottom turn and surfed a smooth line across the wave!',
        options: [
            {
                text: 'Attempt a cut back',
                setState: { surfAction: 'wipeout' },
                nextText: 11
            },
            {
                text: 'Attempt to carve down the line',
                setState: { surfAction: 'surfing intermediate' },
                nextText: 13
            }
        ]
    },
    {
        id: 13,
        text: 'You carve the wave until it fizzes out. Congratulations You pass the intermediate level!',
        options: [
            {
                text: 'Continue to advanced level',
                setState: { surfAction: 'surf travel' },
                nextText: 14
            }
        ]
    },
    {
        id: 14,
        text: 'Welcome to the advanced level! Ready for more challenges?',
        options: [
            {
                text: 'Yes, bring it on!',
                setState: { surfboard: 'advanced surfboard', surfSpot: 'advanced surf spot' },
                nextText: 15
            }
        ]
    },
    {
        id: 15,
        text: 'You are now at the advanced level. The waves are big and heavy, be careful today!',
        options: [
            {
                text: 'Paddle out',
                setState: { surfAction: 'paddle out' },
                nextText: 16
            },
        ]
    },
    {
        id: 16,
        text: 'You see a big wave approaching. What do you do?',
        options: [
            {
                text: 'Attempt to catch the wave',
                setState: { surfAction: 'break board' },
                nextText: 17
            },
            {
                text: 'Avoid the wave with a duck dive',
                setState: { surfAction: 'duck dive' },
                nextText: 18
            }
        ]
    },
    {
        id: 17,
        text: 'You went too early and the wave passed you by. The next wave detonated on your head and snapped your board',
        options: [
            {
                text: 'paddle in with your broken board and borrow another',
                setState: { surfAction: '' },
                nextText: 15
            },
        ]
    },
    {
        id: 18,
        text: 'You avoided that wave and see the next one coming, do you?',
        options: [
            {
                text: 'Attempt to catch the wave',
                setState: { surfAction: 'pop up' },
                nextText: 19
            },
            {
                text: 'Avoid the wave with a duck dive',
                setState: { surfAction: 'wipeout' },
                nextText: 20
            }
        ]
    },
    {
        id: 19,
        text: 'You barely make the wave and drop in late! do you?',
        options: [
            {
                text: 'Tuck in and attempt to get barrelled?',
                setState: { surfAction: 'surfing advanced' },
                nextText: 21
            },
            {
                text: 'Attempt a bottom turn?',
                setState: { surfAction: 'break board' },
                nextText: 22
            }
        ]
    },
    {
        id: 20,
        text: 'You messed up the duck dive. You got dragged out of position and the next wave detonated on your head and snapped your board',
        options: [
            {
                text: 'paddle in with your broken board and borrow another',
                setState: { surfAction: '' },
                nextText: 15
            },
        ]
    },
    {
        id: 21,
        text: "You make the barrel and have the ride of your life!!! Congratulations you pass the advanced level!",
        options: [
            {
                text: 'Finish game',
                nextText: 16
            },
        ]
    },
    {
        id: 22,
        text: "You can't make the turn and fall off the board. The wave was so heavy it snapped your board ",
        options: [
            {
                text: 'paddle in with your broken board and borrow another',
                setState: { surfAction: '' },
                nextText: 15
            },
        ]
    },
];

// call start game function
startGame()
