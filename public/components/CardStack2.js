function setDefaultCardStackStyles() {
    const allStacks = document.querySelectorAll('.AllStacks');
    allStacks.forEach(allStack => {
        allStack.style.display = 'flex';
        allStack.style.flexDirection = 'row';
        allStack.style.width = '1000px';
        allStack.style.flexWrap = 'wrap';
        allStack.style.justifyContent = 'center';
        allStack.style.alignItems = 'center';
        allStack.style.gap = '80px';
        allStack.style.margin = '80px';
        allStack.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
    });

    const stackLabelValues = document.querySelectorAll('#StackLabelValue');
    stackLabelValues.forEach(stackLabelValue => {
        stackLabelValue.style.opacity = '0';
    });

    const stackLabelClose = document.querySelectorAll('#StackLabelClose');
    stackLabelClose.forEach(stackLabelClose => {
        stackLabelClose.style.opacity = '0';
    });

    const stackLabels = document.querySelectorAll('.StackLabel');
    stackLabels.forEach(stackLabel => {
        stackLabel.style.display = 'flex';
        stackLabel.style.flexDirection = 'column';
        stackLabel.style.alignItems = 'center';
        stackLabel.style.justifyContent = 'center';
        stackLabel.style.height = '450px';
        stackLabel.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
        stackLabel.style.cursor = 'pointer';
    });

    const cardStacks = document.querySelectorAll('.CardStack');
    cardStacks.forEach(cardStack => {
        cardStack.style.position = 'relative';
        cardStack.style.display = 'flex';
        cardStack.style.flexDirection = 'column';
        cardStack.style.alignItems = 'center';
        cardStack.style.justifyContent = 'center';
        cardStack.style.width = '400px';
        cardStack.style.height = '400px';
        cardStack.style.transition = 'all 0.5s ease, opacity 0.3s ease';
    });

    const cards = document.querySelectorAll('.Card');
    cards.forEach((card, index) => {
        card.style.position = 'absolute';
        card.style.borderRadius = '24px';
        card.style.boxShadow = '0 0px 30px rgba(0, 0, 0, 0.05)';
        card.style.aspectRatio = '1 / 1';
        card.style.overflow = 'hidden';
        card.style.height = '300px';
        card.style.width = '300px';
        card.style.transformOrigin = 'center';
        card.style.border = '10px solid white';
        card.style.transition = 'all 0.5s ease';

        // child styles
        const cardStack = card.parentNode;
        const cardsInStack = cardStack.children;
        const cardIndexInStack = Array.prototype.indexOf.call(cardsInStack, card);

        setCardPosition(card, cardIndexInStack);

        // hover styles
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

const stackLabels = document.querySelectorAll('.StackLabel');
stackLabels.forEach(stackLabel => {
    stackLabel.addEventListener('click', function() {
        expandStackLabel(this);
    });
});

function expandStackLabel(stackLabel) {
    stackLabel.classList.toggle('expanded');
    const isExpanded = stackLabel.classList.contains('expanded');
    const cardStack = stackLabel.querySelector('.CardStack');
    
    if (isExpanded) {
        document.body.style.overflow = 'hidden';
        const rect = stackLabel.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const centerY = rect.top + scrollTop + rect.height / 2 - window.innerHeight / 2;

        const allStackLabels = document.querySelectorAll('.StackLabel');
        allStackLabels.forEach(label => {
            if (label !== stackLabel) {
                label.style.transition = 'width 0.25s ease, height 0.25s ease';
                label.style.width = '0px';
                label.style.height = '0px';
            }
        });

        const allCardStacks = document.querySelectorAll('.CardStack');
        allCardStacks.forEach(cardStack => {
            if (cardStack !== cardStack) {
                cardStack.style.transition = 'width 0.25s ease, height 0.25s ease';
                cardStack.style.width = '0px';
                cardStack.style.height = '0px';
            }
        });

        const allCards = document.querySelectorAll('.Card');
        allCards.forEach(card => {
            if (card.parentNode !== cardStack) {
                card.style.transition = 'width 0.5s ease, height 0.5s ease';
                card.style.width = '0px';
                card.style.height = '0px';
            }
        });
 
        window.scrollTo({
            top: centerY,
            behavior: 'smooth'
        });

        setTimeout(() => {
            stackLabel.style.transition = 'width 0.5s ease, height 0.5s ease, z-index 0s ease';
            stackLabel.style.width = '100vw';
            stackLabel.style.height = '100vh';
            stackLabel.style.zIndex = '9999';
            window.scrollTo({
                top: stackLabel.offsetTop,
                behavior: 'smooth'
            });
            const expandedCardStack = stackLabel.querySelector('.CardStack');
            const expandedCards = expandedCardStack.querySelectorAll('.Card');
            expandedCards.forEach((expandedCard, index) => {
                expandedCard.style.width = '350px';
                expandedCard.style.height = '350px';
                switch (index) {
                    case 0:
                        expandedCard.style.transform = 'translate(-400px, 0px) rotate(0deg)';
                        break;
                    case 1:
                        expandedCard.style.transform = 'translate(0px, 0px) rotate(0deg)';
                        break;
                    case 2:
                        expandedCard.style.transform = 'translate(400px, 0px) rotate(0deg)';
                        break;
                }
            });
            const stackLabelValue = stackLabel.querySelector('#StackLabelValue');
            if (stackLabelValue) {
                stackLabelValue.style.opacity = '1';
            }
            const stackLabelClose = stackLabel.querySelector('#StackLabelClose');
            if (stackLabelClose) {
                stackLabelClose.style.opacity = '1';   
            }
        }, 100);

    } else {
        document.body.style.overflow = 'auto';
        stackLabel.style.width = '';
        stackLabel.style.height = '450px';
        stackLabel.style.zIndex = '';

        const cardStack = stackLabel.querySelector('.CardStack');
        cardStack.style.width = '400px';
        cardStack.style.height = '400px';
        cardStack.style.flexDirection = 'column';
        cardStack.style.gap = '';

        const cards = cardStack.querySelectorAll('.Card');
        cards.forEach((card, index) => {
            card.style.position = 'absolute';
            card.style.width = '300px';
            card.style.height = '300px';
            card.style.margin = '';
            setCardPosition(card, index);
        });

        const stackLabelValue = stackLabel.querySelector('#StackLabelValue');
        if (stackLabelValue) {
            stackLabelValue.style.opacity = '0';
        }

        const stackLabelClose = stackLabel.querySelector('#StackLabelClose');
        if (stackLabelClose) {
            stackLabelClose.style.opacity = '0';
        }

        const allStackLabels = document.querySelectorAll('.StackLabel');
        allStackLabels.forEach(label => {
            if (label !== stackLabel) {
                label.style.width = '';
                label.style.height = '450px';
                label.style.overflow = '';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setDefaultCardStackStyles();
});