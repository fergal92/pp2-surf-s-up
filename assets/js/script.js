const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('options-buttons')

console.log('hello')
let state = {}
function startGame(){
    state = {} 
    showTextNode(1)
}

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    // while (optionButtonsElement.firstChild) {
    //     optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    // }
}

function selectOption(){

}

const textNodes = [
    {
        id: 1,
        text: 'The surf looks good, do you want to paddle out?',
        options: [
            {
                text: 'Paddle out',
                setState: {surfing: true},
                nextText: 2
            },
            {
                text: 'Chill on the beach',
                nextText: 2
            }
        ]
    },
    {
        id: 2
    }
]
startGame()