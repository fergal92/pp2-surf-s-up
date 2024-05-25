const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const surfboardImage = document.getElementById('surfboard-image');
const surfSpotImage = document.getElementById('surfspot-image');

// Text based game
console.log('hello')
let state = {}

/**
 * Starts the game
 */
function startGame(){
    state = {
        surfboard: 'beginner surfboard',
        surfSpot: 'beginner surf spot'
    } ;
    showTextNode(1)
}

/**
 * Updates the surboard and surf spot images depending on surf level
 */
function updateImages() {
    if (state.surfboard === 'beginner surfboard') {
        surfboardImage.src = "assets/images/longboard.jpg"; // Path to beginner surfboard image
    } else if (state.surfboard === 'intermediate surfboard') {
        surfboardImage.src = 'assets/images/midlength.jpg'; // Path to intermediate surfboard image
    } else if (state.surfboard === 'advanced surfboard') {
        surfboardImage.src = 'assets/images/shortboard.jpg'; // Path to advanced surfboard image
    }

    if (state.surfSpot === 'beginner surf spot') {
        surfSpotImage.src = 'assets/images/inch-beach-beginner.jpg'; // Path to beginner surf spot image
    } else if (state.surfSpot === 'intermediate surf spot') {
        surfSpotImage.src = 'assets/images/strandhill-intermediate.jpg'; // Path to intermediate surf spot image
    } else if (state.surfSpot === 'advanced surf spot') {
        surfSpotImage.src = 'assets/images/pmpa-advanced.jpg'; // Path to advanced surf spot image
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
*
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
    state = Object.assign(state, option.setState)
    updateImages(); // call updateImages() after upodateing the staet
    showTextNode(nextTextNodeId)
}

// Text nodes array
const textNodes = [
    {
        id: 1,
        text: 'The surf looks good, do you want to paddle out?',
        options: [
            {
                text: 'Paddle out',
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
                nextText: 3
            },
            {
                text: 'Avoid the wave with a turtle roll',
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
                nextText: 2
            },
            {
                text: 'Return to beach',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'Welcome to the intermediate level! Ready for more challenges?',
        options: [
            {
                text: 'Yes, bring it on!',
                setState: { surfboard: 'intermediate surfboard', surfSpot: 'intermediate surf spot' },
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
                nextText: 8
            },
            {
                text: 'Take a break',
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
                nextText: 9
            },
            {
                text: 'Avoid the wave with a duck dive',
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
                nextText: 11
            },
            {
                text: 'Attempt a bottom turn?',
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
                nextText: 8
            },
            {
                text: 'Return to beach',
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
                nextText: 11
            },
            {
                text: 'Attempt to carve down the line',
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
                nextText: 17
            },
            {
                text: 'Avoid the wave with a duck dive',
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
                nextText: 19
            },
            {
                text: 'Avoid the wave with a duck dive',
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
                nextText: 21
            },
            {
                text: 'Attempt a bottom turn?',
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
                nextText: 15
            },
        ]
    },
    {
        id: 21,
        text: "You make the barrel and have the ride of your life!!! Congratulations you pass the advanced level!",
        options: [
            {
                text: 'Keep surfing?',
                nextText: 16
            },
            {
                text: 'Paddle in?',
                nextText: 15
            }
        ]
    },
    {
        id: 22,
        text: "You can't make the turn and fall off the board. The wave was so heavy it snapped your board ",
        options: [
            {
                text: 'paddle in with your broken board and borrow another',
                nextText: 15
            },
        ]
    },
];

// call start game function
startGame()
