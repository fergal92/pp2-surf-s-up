/* jshint esversion: 11 */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("surf-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission if validation fails


        if (!validateForm()) {
            // Prevent form submission if validation fails
            return;
        }


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

        // Save surfboard sizes to localStorage
        localStorage.setItem('surfboardSizes', JSON.stringify(surfboardSizes));

        // Update the state to include surfboardSizes in order to display the correct size in the game
        state.surfboardSizes = surfboardSizes;

        // Hide the form
        document.getElementById('data-input').style.display = 'none';

        // Hide the text-container
        document.getElementById('text-container-1').style.display = 'none';

        // Show the surf game
        document.getElementById('surf-game-container').style.display = 'block';

        // Alert message to begin game
        showAlert(`Hi ${firstName}! Let's go surfing! Your surfboard sizes based on your height and weight will be: Beginner - ${surfboardSizes.beginner}, Intermediate - ${surfboardSizes.intermediate}, Advanced - ${surfboardSizes.advanced}`);
    });


    /** 
     * Validation for height and weight in data input form
     */
    function validateForm() {
        clearErrors();

        const height = parseFloat(document.getElementById("height").value);
        const weight = parseFloat(document.getElementById("weight").value);

        let valid = true;

        if (height < 10 || height > 300) {
            showError("heightError", "Height must be between 10cm and 300cm.");
            valid = false;
        }

        if (weight < 5 || weight > 600) {
            showError("weightError", "Weight must be between 5kg and 600kg.");
            valid = false;
        }

        return valid;
    }

    /** 
     * Function to show validation error in form 
     */
    function showError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }

    /**
     * Clear all form errors
     */
    function clearErrors() {
        document.getElementById("height-error").textContent = "";
        document.getElementById("weight-error").textContent = "";
    }

    // Calculate surfboard size for each category
    function calculateSurfboardSize(height, weight) {
        let surfboardSize;
        const heightWeightRatio = height / weight;

        // Calculate beginner surfboard size
        if (heightWeightRatio < 2) {
            surfboardSize = '10\'';
        } else if (heightWeightRatio >= 2 && heightWeightRatio < 3) {
            surfboardSize = '9\'';
        } else {
            surfboardSize = '8\'';
        }

        // Intermediate and Advanced surfboard sizes based on beginner surfboard size
        let intermediateSurfboardSize;
        let advancedSurfboardSize;

        switch (surfboardSize) {
            case '10\'':
                intermediateSurfboardSize = '8\'';
                advancedSurfboardSize = '7\'';
                break;
            case '9\'':
                intermediateSurfboardSize = "7'6\"";
                advancedSurfboardSize = '6\'';
                break;
            case '8\'':
                intermediateSurfboardSize = '7\'';
                advancedSurfboardSize = '5\'6"';
                break;
            default:
                intermediateSurfboardSize = '7\'';
                advancedSurfboardSize = '5\'6"';
                break;
        }

        return {
            beginner: surfboardSize,
            intermediate: intermediateSurfboardSize,
            advanced: advancedSurfboardSize
        };
    }



    const textElement = document.getElementById('text');
    const optionButtonsElement = document.getElementById('option-buttons');
    const surfboardImage = document.getElementById('surfboard-image');
    const surfSpotImage = document.getElementById('surfspot-image');
    const surfGif = document.getElementById('surf-gif');
    const beginnerAudio = document.getElementById('beginner-audio');
    const intermediateAudio = document.getElementById('intermediate-audio');
    const advancedAudio = document.getElementById('advanced-audio');
    const startStopButton = document.getElementById('start-stop-button');

    // Text based game
    let state = {};
    let currentAudio = null;
    let currentSurfboardState = '';
    let isAudioPlaying = true;

    /**
     * Starts the game
     */
    function startGame() {
        stopAllAudio();
        state = {
            surfboard: 'beginner surfboard',
            surfSpot: 'beginner surf spot',
            surfGif: ''
        };
        updateAudio();
        showTextNode(1);
    }

    /**
     * Updates the surboard and surf spot images depending on surf level
     */
    function updateImages() {
        const surfboardSizeText = document.getElementById('surfboard-size-text');
        const surfSpotLocationText = document.getElementById('surfspot-location-text');


        const {
            surfboardSizes
        } = state;

        if (state.surfboard === 'beginner surfboard') {
            surfboardImage.src = "assets/images/longboard.jpg"; // Path to beginner surfboard image
            surfboardSizeText.innerText = `Longboard Size: ${surfboardSizes.beginner}`;
        } else if (state.surfboard === 'intermediate surfboard') {
            surfboardImage.src = 'assets/images/midlength-intermediate.jpg'; // Path to intermediate surfboard image
            surfboardSizeText.innerText = `Surfboard Size: ${surfboardSizes.intermediate}`;
        } else if (state.surfboard === 'advanced surfboard') {
            surfboardImage.src = 'assets/images/shortboard-advanced.jpg'; // Path to advanced surfboard image
            surfboardSizeText.innerText = `Surfboard Size: ${surfboardSizes.advanced}`;
        }

        if (state.surfSpot === 'beginner surf spot') {
            surfSpotImage.src = 'assets/images/inch-beach-beginner.jpg'; // Path to beginner surf spot image
            surfSpotLocationText.innerText = 'Surf Spot: Inch Beach, Co. Kerry';
        } else if (state.surfSpot === 'intermediate surf spot') {
            surfSpotImage.src = 'assets/images/strandhill-intermediate.jpg'; // Path to intermediate surf spot image
            surfSpotLocationText.innerText = 'Surf Spot: Strandhill, Co. Sligo';
        } else if (state.surfSpot === 'advanced surf spot') {
            surfSpotImage.src = 'assets/images/pmpa-advanced.jpg'; // Path to advanced surf spot image
            surfSpotLocationText.innerText = 'Surf Spot: Pmpa, Co. Donegal';
        }

        if (state.surfAction === 'paddle out') {
            surfGif.src = 'assets/images/paddle-out.gif';
        } else if (state.surfAction === 'wipeout') {
            surfGif.src = 'assets/images/wipeout.gif';
        } else if (state.surfAction === 'surfing beginner') {
            surfGif.src = 'assets/images/surfing-beginner.gif';
        } else if (state.surfAction === 'surfing intermediate') {
            surfGif.src = 'assets/images/surfing-intermediate.gif';
        } else if (state.surfAction === 'surfing advanced') {
            surfGif.src = 'assets/images/surfing-advanced.gif';
        } else if (state.surfAction === 'surf travel') {
            surfGif.src = 'assets/images/surfing-travel.gif';
        } else if (state.surfAction === 'turtle roll') {
            surfGif.src = 'assets/images/turtle-roll.gif';
        } else if (state.surfAction === 'duck dive') {
            surfGif.src = 'assets/images/duck-dive.gif';
        } else if (state.surfAction === 'take break') {
            surfGif.src = 'assets/images/take-break.gif';
        } else if (state.surfAction === 'break board') {
            surfGif.src = 'assets/images/broken-board.gif';
        } else if (state.surfAction === 'bottom turn') {
            surfGif.src = 'assets/images/bottom-turn.gif';
        } else if (state.surfAction === 'pop up') {
            surfGif.src = 'assets/images/pop-up.gif';
        }
    }

    /**
     * Shows the text at the selected stage of the game
     */
    function showTextNode(textNodeIndex) {
        const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
        textElement.innerText = textNode.text;
        while (optionButtonsElement.firstChild) {
            optionButtonsElement.removeChild(optionButtonsElement.firstChild);
        }
        textNode.options.forEach(option => {
            if (showOption(option)) {
                const button = document.createElement('button');
                button.innerText = option.text;
                button.classList.add('btn');
                button.addEventListener('click', () => selectOption(option));
                optionButtonsElement.appendChild(button);
            }
        });
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
        const nextTextNodeId = option.nextText;
        if (nextTextNodeId <= 0) {
            return startGame();
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
            showAlert('Congratulations! You have completed the game. Go out and surf for real now you are ready!');

            // Delay the reload by 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 15000); // Adjust the delay time as needed
        }
    }

    function playAudio() {
        stopAllAudio(); // Stop any currently playing audio

        // Determine which audio to play based on the current surfboard state
        if (state.surfboard === 'beginner surfboard') {
            currentAudio = beginnerAudio;
            currentAudio.volume = 0.01; // Set the volume to 50%
        } else if (state.surfboard === 'intermediate surfboard') {
            currentAudio = intermediateAudio;
            currentAudio.volume = 0.01; // Set the volume to 50%
        } else if (state.surfboard === 'advanced surfboard') {
            currentAudio = advancedAudio;
            currentAudio.volume = 0.01; // Set the volume to 50%
        }

        // Play the selected audio
        if (currentAudio) {
            currentAudio.play();
            isAudioPlaying = true;
        }
    }

    function stopAllAudio() {
        beginnerAudio.pause();
        intermediateAudio.pause();
        advancedAudio.pause();
        currentAudio = null;
        isAudioPlaying = false;
    }

    function updateAudio() {
        playAudio(state.surfboard);
    }

    function toggleAudio() {
        if (!currentAudio) {
            playAudio(); // If no audio is currently playing, start playing
        } else {
            stopAllAudio(); // If audio is currently playing, stop it
        }
    }

    // Show modal with custom message
    function showModal(message) {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    // Hide modal
    function hideModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    }

    // Function to handle modal close button click
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('close')) {
            hideModal();
        }
    });

    // Replace alert with custom modal
    function showAlert(message) {
        showModal(message);
    }

    // Text nodes array
    const textNodes = [{
            id: 1,
            text: 'The surf looks good, do you want to paddle out?',
            options: [{
                text: 'Paddle out',
                setState: {
                    surfboard: 'beginner surfboard',
                    surfSpot: 'beginner surf spot',
                    surfAction: 'paddle out'
                },
                nextText: 2
            }, ]
        },
        {
            id: 2,
            text: 'You see a big wave approaching. What do you do?',
            options: [{
                    text: 'Catch the wave',
                    setState: {
                        surfAction: 'surfing beginner'
                    },
                    nextText: 3
                },
                {
                    text: 'Avoid the wave with a turtle roll',
                    setState: {
                        surfAction: 'turtle roll'
                    },
                    nextText: 4
                }
            ]
        },
        {
            id: 3,
            text: 'You caught the wave and had an amazing ride! You pass the beginner level!',
            options: [{
                text: 'Continue to intermediate level',
                setState: {
                    surfAction: 'surf travel'
                },
                nextText: 6
            }]
        },
        {
            id: 4,
            text: 'You executed the turtle roll perfectly to avoid the wave.',
            options: [{
                    text: 'Continue surfing',
                    setState: {
                        surfAction: 'paddle out'
                    },
                    nextText: 2
                },
                {
                    text: 'Return to beach',
                    setState: {
                        surfAction: ''
                    },
                    nextText: 1
                }
            ]
        },
        {
            id: 6,
            text: 'Welcome to the intermediate level! Ready for more challenges?',
            options: [{
                text: 'Yes, bring it on!',
                setState: {
                    surfboard: 'intermediate surfboard',
                    surfSpot: 'intermediate surf spot',
                    surfAction: 'surf travel'
                },
                nextText: 7
            }]
        },
        {
            id: 7,
            text: 'You are now at the intermediate level. Face new waves and enjoy!',
            options: [{
                    text: 'Paddle out',
                    setState: {
                        surfAction: 'paddle out'
                    },
                    nextText: 8
                },
                {
                    text: 'Take a break',
                    setState: {
                        surfAction: 'take break'
                    },
                    nextText: 6
                }
            ]
        },
        {
            id: 8,
            text: 'You see a big wave approaching. What do you do?',
            options: [{
                    text: 'Catch the wave',
                    setState: {
                        surfAction: 'pop up'
                    },
                    nextText: 9
                },
                {
                    text: 'Avoid the wave with a duck dive',
                    setState: {
                        surfAction: 'duck dive'
                    },
                    nextText: 10
                }
            ]
        },
        {
            id: 9,
            text: 'You caught the wave and popped up, now What do you do?',
            options: [{
                    text: 'Attempt a cut back?',
                    setState: {
                        surfAction: 'wipeout'
                    },
                    nextText: 11
                },
                {
                    text: 'Attempt a bottom turn?',
                    setState: {
                        surfAction: 'bottom turn'
                    },
                    nextText: 12
                }
            ]
        },
        {
            id: 10,
            text: 'You executed the duck dive perfectly to avoid the wave.',
            options: [{
                    text: 'Continue surfing',
                    setState: {
                        surfAction: 'paddle out'
                    },
                    nextText: 8
                },
                {
                    text: 'Return to beach',
                    setState: {
                        surfAction: ''
                    },
                    nextText: 6
                }
            ]
        },
        {
            id: 11,
            text: 'You missed the cut back, fell off the board and got caught inside a set of breaking waves, only one thing to do!',
            options: [{
                text: 'Duck dive the wave',
                setState: {
                    surfAction: 'duck dive'
                },
                nextText: 10
            }, ]
        },
        {
            id: 12,
            text: 'You pulled off the bottom turn and surfed a smooth line across the wave!',
            options: [{
                    text: 'Attempt a cut back',
                    setState: {
                        surfAction: 'wipeout'
                    },
                    nextText: 11
                },
                {
                    text: 'Attempt to carve down the line',
                    setState: {
                        surfAction: 'surfing intermediate'
                    },
                    nextText: 13
                }
            ]
        },
        {
            id: 13,
            text: 'You carve the wave until it fizzes out. Congratulations You pass the intermediate level!',
            options: [{
                text: 'Continue to advanced level',
                setState: {
                    surfAction: 'surf travel'
                },
                nextText: 14
            }]
        },
        {
            id: 14,
            text: 'Welcome to the advanced level! Ready for more challenges?',
            options: [{
                text: 'Yes, bring it on!',
                setState: {
                    surfboard: 'advanced surfboard',
                    surfSpot: 'advanced surf spot'
                },
                nextText: 15
            }]
        },
        {
            id: 15,
            text: 'You are now at the advanced level. The waves are big and heavy, be careful today!',
            options: [{
                text: 'Paddle out',
                setState: {
                    surfAction: 'paddle out'
                },
                nextText: 16
            }, ]
        },
        {
            id: 16,
            text: 'You see a big wave approaching. What do you do?',
            options: [{
                    text: 'Attempt to catch the wave',
                    setState: {
                        surfAction: 'break board'
                    },
                    nextText: 17
                },
                {
                    text: 'Avoid the wave with a duck dive',
                    setState: {
                        surfAction: 'duck dive'
                    },
                    nextText: 18
                }
            ]
        },
        {
            id: 17,
            text: 'You went too early and the wave passed you by. The next wave detonated on your head and snapped your board',
            options: [{
                text: 'paddle in with your broken board and borrow another',
                setState: {
                    surfAction: ''
                },
                nextText: 15
            }, ]
        },
        {
            id: 18,
            text: 'You avoided that wave and see the next one coming, do you?',
            options: [{
                    text: 'Attempt to catch the wave',
                    setState: {
                        surfAction: 'pop up'
                    },
                    nextText: 19
                },
                {
                    text: 'Avoid the wave with a duck dive',
                    setState: {
                        surfAction: 'wipeout'
                    },
                    nextText: 20
                }
            ]
        },
        {
            id: 19,
            text: 'You barely make the wave and drop in late! do you?',
            options: [{
                    text: 'Tuck in and attempt to get barrelled?',
                    setState: {
                        surfAction: 'surfing advanced'
                    },
                    nextText: 21
                },
                {
                    text: 'Attempt a bottom turn?',
                    setState: {
                        surfAction: 'break board'
                    },
                    nextText: 22
                }
            ]
        },
        {
            id: 20,
            text: 'You messed up the duck dive. You got dragged out of position and the next wave detonated on your head and snapped your board',
            options: [{
                text: 'paddle in with your broken board and borrow another',
                setState: {
                    surfAction: ''
                },
                nextText: 15
            }, ]
        },
        {
            id: 21,
            text: "You make the barrel and have the ride of your life!!! Congratulations you pass the advanced level!",
            options: [{
                text: 'Finish game',
                nextText: 16
            }, ]
        },
        {
            id: 22,
            text: "You can't make the turn and fall off the board. The wave was so heavy it snapped your board ",
            options: [{
                text: 'paddle in with your broken board and borrow another',
                setState: {
                    surfAction: ''
                },
                nextText: 15
            }, ]
        },
    ];

    // call start game function
    startGame();
    stopAllAudio();

    startStopButton.addEventListener('click', toggleAudio);
});