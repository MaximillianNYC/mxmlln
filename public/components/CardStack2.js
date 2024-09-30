const initialStyles = {
    allStack: {
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        maxWidth: '1000px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '80px',
        margin: '80px',
        transition: 'opacity 0.3s ease, filter 0.3s ease'
    },
    stackLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '450px',
        height: '450px',
        transition: 'opacity 0.3s ease, filter 0.3s ease',
        cursor: 'pointer'
    },
    stackLabelValue: {
        opacity: '0',
        fontSize: '32px',
        fontWeight: '900',
        transition: 'opacity 0.15s'
    },
    stackLabelClose: {
        opacity: '0',
        marginTop: '40px',
        fontSize: '14px',
        letterSpacing: '2px',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '16px',
        borderRadius: '100px',
        transition: 'opacity 0.15s'
    },
    cardStack: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '400px',
        height: '400px',
        gap: '0px',
        transition: 'all 0.5s ease, opacity 0.3s ease'
    },
    card: {
        borderRadius: '24px',
        boxShadow: '0 0px 30px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        height: '300px',
        width: '300px',
        border: '10px solid white',
        margin: '-150px',
        transition: 'all 0.5s ease',
    }
};

// Set card child positions
function setCardPosition(card, index) {
    switch (index) {
        case 0:
            card.style.transform = 'translate(5px, 0px) rotate(15deg)';
            card.style.zIndex = '500';
            break;
        case 1:
            card.style.transform = 'translate(0px, 5px) rotate(-10deg)';
            card.style.zIndex = '450';
            break;
        case 2:
            card.style.transform = 'translate(0px, 5px) rotate(3deg)';
            card.style.zIndex = '300';
            break;
    }
}

function setDefaultCardStackStyles() {
    // Main container
    const allStacks = document.querySelectorAll('.AllStacks');
    allStacks.forEach(allStack => {
        Object.assign(allStack.style, initialStyles.allStack);
    });
    // Card stack container
    const stackLabels = document.querySelectorAll('.StackLabel');
    stackLabels.forEach(stackLabel => {
        Object.assign(stackLabel.style, initialStyles.stackLabel);
    });
    const stackLabelValues = document.querySelectorAll('#StackLabelValue');
    stackLabelValues.forEach(stackLabelValue => {
        Object.assign(stackLabelValue.style, initialStyles.stackLabelValue);
    });
    const stackLabelClose = document.querySelectorAll('#StackLabelClose');
    stackLabelClose.forEach(stackLabelClose => {
        Object.assign(stackLabelClose.style, initialStyles.stackLabelClose);
    });
    // Card stack
    const cardStacks = document.querySelectorAll('.CardStack');
    cardStacks.forEach(cardStack => {
        Object.assign(cardStack.style, initialStyles.cardStack);
    });
    // Cards
    const cards = document.querySelectorAll('.Card');
    cards.forEach((card, index) => {
        Object.assign(card.style, initialStyles.card);
        // Card child styles
        const cardStack = card.parentNode;
        const cardsInStack = cardStack.children;
        const cardIndexInStack = Array.prototype.indexOf.call(cardsInStack, card);
        setCardPosition(card, cardIndexInStack);
        // Card hover styles
        cardStack.addEventListener('mouseover', function() {
            const parentStackLabel = cardStack.closest('.StackLabel');
            if (!parentStackLabel || !parentStackLabel.classList.contains('expanded')) {
                switch (cardIndexInStack) {
                    case 0:
                        card.style.transform = 'translate(-190px, -20px) rotate(-10deg)';
                        break;
                    case 1:
                        card.style.transform = 'translate(50px, 0px) rotate(0deg)';
                        break;
                    case 2:
                        card.style.transform = 'translate(250px, -30px) rotate(10deg)';
                        break;
                }
                const otherCardStacks = document.querySelectorAll('.CardStack');
                otherCardStacks.forEach((otherCardStack) => {
                    if (otherCardStack !== cardStack) {
                        otherCardStack.style.opacity = '0.8';
                        otherCardStack.style.filter = 'blur(20px)';
                        otherCardStack.style.zIndex = '0';
                    }
                });
                cardStack.style.opacity = '1';
                cardStack.style.filter = 'none';
                cardStack.style.zIndex = '1000';
            }
        });
        // Card mouse out styles
        cardStack.addEventListener('mouseout', function() {
            const parentStackLabel = cardStack.closest('.StackLabel');
            if (!parentStackLabel || !parentStackLabel.classList.contains('expanded')) {
                setCardPosition(card, cardIndexInStack);
                const otherCardStacks = document.querySelectorAll('.CardStack');
                otherCardStacks.forEach((otherCardStack) => {
                    otherCardStack.style.opacity = '1';
                    otherCardStack.style.filter = 'none';
                });
            }
        });
    });
}

// Initialize default styles
document.addEventListener('DOMContentLoaded', function() {
    setDefaultCardStackStyles();
});

// Expand stack trigger
const stackLabels = document.querySelectorAll('.StackLabel');
stackLabels.forEach(stackLabel => {
    stackLabel.addEventListener('click', function() {
        expandStackLabel(this);
    });
});

// Expand stack controls
function expandStackLabel(stackLabel) {
    stackLabel.classList.toggle('expanded');
    const isExpanded = stackLabel.classList.contains('expanded');
    const cardStack = stackLabel.querySelector('.CardStack');
    const allStackLabels = document.querySelectorAll('.StackLabel');
    const allCardStacks = document.querySelectorAll('.CardStack');
    const allCards = document.querySelectorAll('.Card');
    if (isExpanded) {
        allStackLabels.forEach(label => {
            if (label !== stackLabel) {
                label.style.transition = 'width 0.05s ease, height 0.05s ease';
                label.style.width = '0px';
                label.style.height = '0px';
            }
        });
        allCardStacks.forEach(stack => {
            if (stack !== cardStack) {
                stack.style.transition = 'width 0.05s ease, height 0.05s ease';
                stack.style.width = '0px';
                stack.style.height = '0px';
            }
        });
        allCards.forEach(card => {
            if (card.parentNode !== cardStack) {
                card.style.transition = 'width 0.05s ease, height 0.05s ease';
                card.style.width = '0px';
                card.style.height = '0px';
            }
        });
        setTimeout(() => {
            stackLabel.style.transition = 'width 0.1s ease, height 0.1s ease, z-index 0s ease';
            stackLabel.style.width = '100vw';
            stackLabel.style.height = '100vh';
            cardStack.style.width = '100vw';
            cardStack.style.gap = '32px';
            setTimeout(() => {
                const cards = stackLabel.querySelectorAll('.Card');
                cards.forEach((card) => {
                    card.style.width = '400px';
                    card.style.height = '400px';
                    card.style.margin = '0px';
                    card.style.transform = 'translate(0px, 0px) rotate(0deg)';
                });
                const stackLabelValue = stackLabel.querySelector('#StackLabelValue');
                if (stackLabelValue) {
                    stackLabelValue.style.transition = 'opacity 1s ease';
                    stackLabelValue.style.opacity = '1';
                }
                const stackLabelClose = stackLabel.querySelector('#StackLabelClose');
                if (stackLabelClose) {
                    stackLabelClose.style.transition = 'opacity 1s ease';
                    stackLabelClose.style.opacity = '1';   
                }
            }, 100);
            setTimeout(() => {
                window.scrollTo({
                    top: stackLabel.offsetTop,
                    behavior: 'smooth'
                });
            }, 150);
        }, 0);
    } else {
        const allStacks = document.querySelector('.AllStacks');
        Object.assign(allStacks.style, initialStyles.allStack);
        allStackLabels.forEach(label => {
            Object.assign(label.style, initialStyles.stackLabel);
        });
        allCardStacks.forEach(stack => {
            Object.assign(stack.style, initialStyles.cardStack);
        });
        allCards.forEach((card) => {
            const cardStack = card.closest('.CardStack');
            const cardIndexInStack = Array.from(cardStack.children).indexOf(card);
            Object.assign(card.style, initialStyles.card);
            setCardPosition(card, cardIndexInStack);
        });
        const allStackLabelValues = stackLabel.querySelectorAll('#StackLabelValue');
        const allStackLabelCloses = stackLabel.querySelectorAll('#StackLabelClose');
        [...allStackLabelValues, ...allStackLabelCloses].forEach(element => {
            Object.assign(element.style, element.id === 'StackLabelValue' ? initialStyles.stackLabelValue : initialStyles.stackLabelClose);
        });
    }
}