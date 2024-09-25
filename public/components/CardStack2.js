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

        // Adding child styles
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

        // Adding hover styles
        cardStack.addEventListener('mouseover', function() {
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
                    otherCardStack.style.zIndex = '0'; // Ensure other stacks have a lower z-index
                }
            });
            cardStack.style.opacity = '1';
            cardStack.style.filter = 'none';
            cardStack.style.zIndex = '1000'; // Ensure the hovered stack has the highest z-index
        });
        cardStack.addEventListener('mouseout', function() {
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
        });

        cardStack.addEventListener('mouseout', function() {
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
        });
    });

    // Adding styles for .StackLabel
    const stackLabels = document.querySelectorAll('.StackLabel');
    stackLabels.forEach(stackLabel => {
        stackLabel.style.display = 'flex';
        stackLabel.style.flexDirection = 'column';
        stackLabel.style.alignItems = 'center';
        stackLabel.style.justifyContent = 'center';
        stackLabel.style.height = 'auto';
        stackLabel.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setDefaultCardStackStyles();
});