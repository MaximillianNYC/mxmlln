function setDefaultCardStackStyles() {
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

    const stackLabels = document.querySelectorAll('.StackLabel');
    stackLabels.forEach(stackLabel => {
        stackLabel.style.display = 'flex';
        stackLabel.style.flexDirection = 'column';
        stackLabel.style.alignItems = 'center';
        stackLabel.style.justifyContent = 'center';
        stackLabel.style.height = 'auto';
        stackLabel.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
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
                        card.style.transform = 'translate(-190px, 20px) rotate(-10deg)';
                        break;
                    case 1:
                        card.style.transform = 'translate(50px, 70px) rotate(0deg)';
                        break;
                    case 2:
                        card.style.transform = 'translate(250px, 0px) rotate(10deg)';
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
            card.style.transform = 'translate(55px, 25px) rotate(15deg)';
            card.style.zIndex = '500';
            break;
        case 1:
            card.style.transform = 'translate(50px, 30px) rotate(-10deg)';
            card.style.zIndex = '450';
            break;
        case 2:
            card.style.transform = 'translate(50px, 30px) rotate(3deg)';
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
    
    if (isExpanded) {
        document.body.style.overflow = 'hidden';
        stackLabel.style.position = 'fixed';
        stackLabel.style.top = '0';
        stackLabel.style.left = '0';
        stackLabel.style.width = '100vw';
        stackLabel.style.height = '100vh';
        stackLabel.style.zIndex = '9999';
        stackLabel.style.display = 'flex';
        stackLabel.style.flexDirection = 'column';
        stackLabel.style.alignItems = 'center';
        stackLabel.style.justifyContent = 'center';

        const expandedCardStack = stackLabel.querySelector('.CardStack');
        expandedCardStack.style.width = '100vw';
        expandedCardStack.style.height = '100vh';
        expandedCardStack.style.flexDirection = 'row';
        expandedCardStack.style.gap = '24px';

        const expandedCards = expandedCardStack.querySelectorAll('.Card');
        expandedCards.forEach(expandedCard => {
            expandedCard.style.position = 'relative';
            expandedCard.style.transform = 'none';
            expandedCard.style.width = '400px';
            expandedCard.style.height = '400px';
            expandedCard.style.margin = '0';
        });

        window.scrollTo({
            top: expandedCardStack.offsetTop,
            behavior: 'smooth'
        });
    } else {
        document.body.style.overflow = 'auto';
        stackLabel.style.position = '';
        stackLabel.style.top = '';
        stackLabel.style.left = '';
        stackLabel.style.width = '';
        stackLabel.style.height = '';
        stackLabel.style.zIndex = '';
        stackLabel.style.display = '';
        stackLabel.style.flexDirection = '';
        stackLabel.style.alignItems = '';
        stackLabel.style.justifyContent = '';

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
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setDefaultCardStackStyles();
});