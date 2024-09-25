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
        card.style.top = '0px';
        card.style.left = '0px';
        card.style.transformOrigin = 'bottom left';
        card.style.border = '10px solid white';
        card.style.transition = 'transform 0.5s ease, margin 0.5s ease';

        // child styles
        const cardStack = card.parentNode;
        const cardsInStack = cardStack.children;
        const cardIndexInStack = Array.prototype.indexOf.call(cardsInStack, card);

        switch (cardIndexInStack) {
            case 0:
                card.style.zIndex = '500';
                card.style.marginTop = '-6px';
                card.style.marginLeft = '5px';
                card.style.transform = 'rotate(15deg)';
                break;
            case 1:
                card.style.zIndex = '450';
                card.style.transform = 'rotate(-10deg)';
                card.style.marginTop = '68px';
                card.style.marginLeft = '72px';
                break;
            case 2:
                card.style.zIndex = '300';
                card.style.transform = 'rotate(3deg)';
                card.style.marginTop = '30px';
                card.style.marginLeft = '34px';
                break;
        }

        // hover styles
        cardStack.addEventListener('mouseover', function() {
            const parentStackLabel = cardStack.closest('.StackLabel');
            if (!parentStackLabel || !parentStackLabel.classList.contains('expanded')) {
                switch (cardIndexInStack) {
                    case 0:
                        card.style.marginLeft = '-150px';
                        card.style.marginTop = '70px';
                        card.style.transform = 'rotate(-10deg)';
                        break;
                    case 1:
                        card.style.marginTop = '70px';
                        card.style.marginLeft = '50px';
                        break;
                    case 2:
                        card.style.marginLeft = '250px';
                        card.style.marginTop = '0px';
                        card.style.transform = 'rotate(10deg)';
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
                switch (cardIndexInStack) {
                    case 0:
                        card.style.marginLeft = '5px';
                        card.style.marginTop = '-6px';
                        card.style.transform = 'rotate(15deg)';
                        break;
                    case 1:
                        card.style.marginTop = '68px';
                        card.style.marginLeft = '72px';
                        card.style.transform = 'rotate(-10deg)';
                        break;
                    case 2:
                        card.style.marginTop = '30px';
                        card.style.marginLeft = '34px';
                        card.style.transform = 'rotate(3deg)';
                        break;
                }
                const otherCardStacks = document.querySelectorAll('.CardStack');
                otherCardStacks.forEach((otherCardStack) => {
                    otherCardStack.style.opacity = '1';
                    otherCardStack.style.filter = 'none';
                });
            }
        });
    });
}

const stackLabels = document.querySelectorAll('.StackLabel');
stackLabels.forEach(stackLabel => {
    stackLabel.addEventListener('click', function() {
        expandStackLabel(this);
    });
});

function expandStackLabel(stackLabel) {
    stackLabel.style.transition = 'all 0.5s ease';
    stackLabel.classList.toggle('expanded');
    const isExpanded = stackLabel.classList.contains('expanded');
    
    if (isExpanded) {
        document.body.style.transition = 'overflow 0.5s ease';
        stackLabel.style.width = '100vw';
        //stackLabel.style.height = '100vh';
        //stackLabel.style.position = 'fixed';
        stackLabel.style.top = '0';
        stackLabel.style.left = '0';
        stackLabel.style.zIndex = '9999';
        //stackLabel.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
        //stackLabel.style.backdropFilter = 'blur(30px)';
        stackLabel.style.display = 'flex';
        stackLabel.style.flexDirection = 'column';
        stackLabel.style.alignItems = 'center';
        stackLabel.style.justifyContent = 'center';

        const expandedCardStack = stackLabel.querySelector('.CardStack');
        expandedCardStack.style.margin = 'auto';
        expandedCardStack.style.width = '100%';
        expandedCardStack.style.display = 'flex';
        expandedCardStack.style.flexDirection = 'row';
        expandedCardStack.style.gap = '24px';

        const expandedCards = expandedCardStack.querySelectorAll('.Card');
        expandedCards.forEach(expandedCard => {
            setExpandedCardStyle(expandedCard);
        });

        // Scroll to the top of the expanded container
        window.scrollTo({
            top: stackLabel.offsetTop,
            behavior: 'smooth'
        });
    } else {
        document.body.style.overflow = 'auto';
        document.body.style.transition = 'overflow 0.5s ease';
        
        const cards = stackLabel.querySelectorAll('.Card');
        cards.forEach((card, index) => {
            setCollapsedCardStyle(card, index);
        });

        // Reset CardStack styles
        const cardStack = stackLabel.querySelector('.CardStack');
        setDefaultCardStackStyle(cardStack);
    }
}

function setExpandedCardStyle(card) {
    card.style.position = 'static';
    card.style.margin = '0';
    card.style.transform = 'none';
    card.style.borderRadius = '24px';
    card.style.border = '10px solid white';
    card.style.transition = 'all 0.5s ease';
    card.style.zIndex = 'auto';
}

function setCollapsedCardStyle(card, index) {
    card.style.position = 'absolute';
    card.style.transition = 'all 0.5s ease';
    
    switch (index) {
        case 0:
            card.style.zIndex = '500';
            card.style.marginTop = '-6px';
            card.style.marginLeft = '5px';
            card.style.transform = 'rotate(15deg)';
            break;
        case 1:
            card.style.zIndex = '450';
            card.style.marginTop = '68px';
            card.style.marginLeft = '72px';
            card.style.transform = 'rotate(-10deg)';
            break;
        case 2:
            card.style.zIndex = '300';
            card.style.marginTop = '30px';
            card.style.marginLeft = '34px';
            card.style.transform = 'rotate(3deg)';
            break;
    }
}

function setDefaultCardStackStyle(cardStack) {
    cardStack.style.position = 'relative';
    cardStack.style.display = 'flex';
    cardStack.style.flexDirection = 'column';
    cardStack.style.alignItems = 'center';
    cardStack.style.justifyContent = 'center';
    cardStack.style.transition = 'all 0.5s ease, opacity 0.3s ease';
    cardStack.style.margin = '';
    cardStack.style.gap = '';
}

document.addEventListener('DOMContentLoaded', function() {
    setDefaultCardStackStyles();
});