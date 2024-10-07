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
        transition: 'opacity 0.3s ease, filter 0.3s ease'
    },
    StackLabelValue: {
        opacity: '1',
        filter: 'blur(0px)',
        fontFamily: "'Archivo', sans-serif",
        fontWeight: 700,
        letterSpacing: '1.5px',
        fontSize: '14px',
        color: '#000000',
        padding: '16px',
        transition: 'opacity 0.15s ease, filter 0.15s ease'
    },
    StackBar: {
        zIndex: '9999',
        position: 'fixed',
        top: '-124px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        width: '400px',
        height: '64px',
        borderRadius: '40px',
        backdropFilter: 'blur(80px)',
        WebkitBackdropFilter: 'blur(80px)',
        backgroundColor: 'rgba(240, 240, 240, 0.75)',
        boxShadow: '0px 3px 30px 0px rgba(0, 0, 0, 0.15)',
        border: 'solid 2px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Archivo', sans-serif",
        fontWeight: 700,
        letterSpacing: '1.5px',
        fontSize: '14px',
        color: '#000000',
        transition: 'all 0.5s'
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
        transition: 'all 0.05s ease, opacity 0.3s ease'
    },
    card: {
        borderRadius: '12%',
        boxShadow: '0 0px 30px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        height: '300px',
        width: '300px',
        border: '10px solid white',
        backgroundColor: '#000000',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.5s ease',
    },
    CardInnerContainer: {
        boxShadow: '0px 3px 10px 0px rgba(0, 0, 0, 0)',
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignContent: 'flex-end',
        transition: 'box-shadow 0.25s, opacity 0.5s ease',
        opacity: '0',
        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))'
    },
    CardContent: {
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '175px',
        margin: '30px'
    },
    CardBadge: {
        alignSelf: 'flex-start',
        display: 'flex',
        height: '15px',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '10px',
        color: '#FFFFFF',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 255, 255, 0.25)'
    },
    BadgeText: {
        paddingLeft: '2px',
        fontFamily: 'Archivo',
        fontWeight: 600,
        letterSpacing: '2px',
        fontSize: '14px'
    },
    CardTitle: {
        color: '#FFFFFF',
        fontFamily: 'Archivo',
        fontWeight: 800,
        fontSize: '32px',
        textShadow: '0px 3px 10px rgba(0, 0, 0, 0.25)',
        textAlign: 'left'
    }
};

const stackRandomFactors = new Map();
function getStackRandomFactors(stackId) {
    if (!stackRandomFactors.has(stackId)) {
        stackRandomFactors.set(stackId, {
        rotation: Math.random() * 0.8 - 0.5,
        cardRotations: []
        });
    }
return stackRandomFactors.get(stackId);
}
function setCardPosition(card, index, totalCards, stackId) {
    const stackFactors = getStackRandomFactors(stackId);
    while (stackFactors.cardRotations.length <= index) {
        stackFactors.cardRotations.push((Math.random() - 0.5) * 40);
    }
    let rotation = stackFactors.cardRotations[index];
    let scale = 1;
    if (index > 2) {
        scale = 1 - ((index - 2) / Math.min(totalCards - 2, 97)) * 0.25;
    }
    card.style.transform = `rotate(${rotation.toFixed(2)}deg) scale(${scale.toFixed(2)})`;
    card.style.zIndex = Math.min(totalCards, 6) - index;
    card.style.margin = '-160px';
}

function setDefaultCardStackStyles() {
    const stackBars = document.querySelectorAll('.StackBar');
    stackBars.forEach(stackBar => {
        Object.assign(stackBar.style, initialStyles.StackBar);
    });
    const stackLabelValues = document.querySelectorAll('.StackLabelValue');
    stackLabelValues.forEach(stackLabelValue => {
        Object.assign(stackLabelValue.style, initialStyles.StackLabelValue);
    }); 
    const cardInnerContainers = document.querySelectorAll('.CardInnerContainer');
    cardInnerContainers.forEach(cardInnerContainer => {
        Object.assign(cardInnerContainer.style, initialStyles.CardInnerContainer);
    });
    const cardContents = document.querySelectorAll('.CardContent');
    cardContents.forEach(cardContent => {
        Object.assign(cardContent.style, initialStyles.CardContent);
    });
    const cardBadges = document.querySelectorAll('.CardBadge');
    cardBadges.forEach(cardBadge => {
        Object.assign(cardBadge.style, initialStyles.CardBadge);
    });
    const badgeTexts = document.querySelectorAll('.BadgeText');
    badgeTexts.forEach(badgeText => {
        Object.assign(badgeText.style, initialStyles.BadgeText);
    });
    const cardTitles = document.querySelectorAll('.CardTitle');
    cardTitles.forEach(cardTitle => {
        Object.assign(cardTitle.style, initialStyles.CardTitle);
    });
    const allStacks = document.querySelectorAll('.AllStacks');
    allStacks.forEach(allStack => {
        Object.assign(allStack.style, initialStyles.allStack);
    });
    const stackLabels = document.querySelectorAll('.StackLabel');
    stackLabels.forEach(stackLabel => {
        Object.assign(stackLabel.style, initialStyles.stackLabel);
    });
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
        setCardPosition(card, cardIndexInStack, cardsInStack.length, cardStack.id || `stack-${Math.random().toString(36).substr(2, 9)}`);
        // Card hover styles
        cardStack.addEventListener('mouseover', function() {
            const parentStackLabel = cardStack.closest('.StackLabel');
            if (!parentStackLabel || !parentStackLabel.classList.contains('expanded')) {
                switch (cardIndexInStack) {
                    case 0:
                        card.style.transform = 'translate(-200px, -20px) rotate(-10deg)';
                        break;
                    case 1:
                        card.style.transform = 'translate(0px, 0px) rotate(0deg)';
                        break;
                    case 2:
                        card.style.transform = 'translate(200px, -30px) rotate(10deg)';
                        break;
                }
                const otherCardStacks = document.querySelectorAll('.CardStack');
                const allStackLabelValues = document.querySelectorAll('.StackLabelValue');
                otherCardStacks.forEach((otherCardStack) => {
                    if (otherCardStack !== cardStack) {
                        otherCardStack.style.opacity = '0.8';
                        otherCardStack.style.filter = 'blur(20px)';
                        otherCardStack.style.zIndex = '0';
                    }
                });
                allStackLabelValues.forEach((stackLabelValue) => {
                    if (!stackLabelValue.closest('.StackLabel').contains(cardStack)) {
                        stackLabelValue.style.opacity = '0.8';
                        stackLabelValue.style.filter = 'blur(20px)';
                    }
                });
                cardStack.style.opacity = '1';
                cardStack.style.filter = 'none';
                cardStack.style.zIndex = '1000';
                parentStackLabel.querySelector('.StackLabelValue').style.opacity = '1';
                parentStackLabel.querySelector('.StackLabelValue').style.filter = 'none';
            }
        });
        // Card mouse out styles
        cardStack.addEventListener('mouseout', function() {
            const parentStackLabel = cardStack.closest('.StackLabel');
            if (!parentStackLabel || !parentStackLabel.classList.contains('expanded')) {
                setCardPosition(card, cardIndexInStack, cardsInStack.length, cardStack.id || `stack-${Math.random().toString(36).substr(2, 9)}`);
                const otherCardStacks = document.querySelectorAll('.CardStack');
                const allStackLabelValues = document.querySelectorAll('.StackLabelValue');
                otherCardStacks.forEach((otherCardStack) => {
                    otherCardStack.style.opacity = '1';
                    otherCardStack.style.filter = 'none';
                    otherCardStack.style.zIndex = 'auto';
                });
                allStackLabelValues.forEach((stackLabelValue) => {
                    stackLabelValue.style.opacity = '1';
                    stackLabelValue.style.filter = 'none';
                });
                cardStack.style.zIndex = 'auto';
            }
        });
    });
}

function lazyLoadCards(cardStack) {
    const cards = cardStack.querySelectorAll('.Card[data-src]');
    console.log(`Attempting to lazy load ${cards.length} cards in stack`);
    cards.forEach(function(card) {
        const img = new Image();
        img.onload = function() {
            card.style.backgroundImage = "url('" + card.dataset.src + "')";
            card.removeAttribute('data-src');
            console.log(`Successfully loaded image: ${card.dataset.src}`);
        };
        img.onerror = function() {
            console.error('Failed to load image:', card.dataset.src);
        };
        img.src = card.dataset.src;
    });
}

// Initialize default styles
document.addEventListener('DOMContentLoaded', function() {
    setDefaultCardStackStyles();
    const cardStacks = document.querySelectorAll('.CardStack');
    cardStacks.forEach(cardStack => {
        const visibleCards = cardStack.querySelectorAll('.Card:nth-child(-n+6)');
        visibleCards.forEach(card => {
            if (card.dataset.src) {
                const img = new Image();
                img.onload = function() {
                    card.style.backgroundImage = "url('" + card.dataset.src + "')";
                    card.removeAttribute('data-src');
                };
                img.src = card.dataset.src;
            }
        });
    });
});

function collapseExpandedStack() {
    if (StackIsExpanded) {
        const expandedStackLabel = document.querySelector('.StackLabel.expanded');
        if (expandedStackLabel) {
            expandStackLabel(expandedStackLabel);
        }
        StackIsExpanded = false;
    }
}

// Expand stack trigger
let StackIsExpanded = false;
const stackLabels = document.querySelectorAll('.StackLabel');
stackLabels.forEach(stackLabel => {
    stackLabel.addEventListener('click', function(event) {
        if (!StackIsExpanded) {
            event.stopPropagation();
            expandStackLabel(this);
        }
    });
});

// Expand stack controls
function expandStackLabel(stackLabel) {
    stackLabel.classList.toggle('expanded');
    const allStacks = document.querySelector('.AllStacks');
    const isExpanded = stackLabel.classList.contains('expanded');
    const cardStack = stackLabel.querySelector('.CardStack');
    const allStackLabels = document.querySelectorAll('.StackLabel');
    const allCardStacks = document.querySelectorAll('.CardStack');
    const allCards = document.querySelectorAll('.Card');
    if (isExpanded) {
        StackIsExpanded = true;
        const allStackLabelValues = document.querySelectorAll('.StackLabelValue');
        allStackLabelValues.forEach(stackLabelValue => {
            stackLabelValue.style.opacity = '0';
        });
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
                card.style.transition = 'all 0.05s ease';
                card.style.width = '0px';
                card.style.height = '0px';
                card.style.transform = 'none';
                card.style.margin = '0px';
            }
        });
        setTimeout(() => {
            allStacks.style.maxWidth = '100vw';
            stackLabel.style.transition = 'width 0.1s ease, height 0.1s ease, z-index 0s ease';
            stackLabel.style.width = '100vw';
            stackLabel.style.height = '100dvh';
            cardStack.style.width = '100%';
            cardStack.style.gap = '32px';
            const cards = stackLabel.querySelectorAll('.Card');
            cards.forEach((card) => {
                card.style.width = '400px';
                card.style.height = '400px';
                card.style.margin = '0px';
                card.style.transform = 'translate(0px, 0px) rotate(0deg)';
            });
            setTimeout(() => {
                const cardInnerContainers = stackLabel.querySelectorAll('.CardInnerContainer');
                cardInnerContainers.forEach((container) => {
                    container.style.opacity = '1';
                });
            }, 250);
            setTimeout(() => {
                const stackLabelRect = stackLabel.getBoundingClientRect();
                const scrollToPosition = window.scrollY + stackLabelRect.top - 8;
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth'
                });
            }, 250);
            lazyLoadCards(cardStack);
        }, 0);
        // StackBar Setup
        const sectionName = stackLabel.querySelector('.StackLabelValue').textContent.trim();
        document.getElementById('stackBarSectionName').textContent = sectionName;
        const StackBar = document.getElementById('StackBar');
        StackBar.style.transition = 'top 0.5s';
        StackBar.style.top = '24px';
    } else {
        StackIsExpanded = false;
        const stackBar = document.querySelector('.StackBar');
        if (stackBar) {
            Object.assign(stackBar.style, initialStyles.StackBar);
        }
        const cardInnerContainers = document.querySelectorAll('.CardInnerContainer');
        cardInnerContainers.forEach(container => {
            Object.assign(container.style, initialStyles.CardInnerContainer);
        }); 
        allCards.forEach((card) => {
            const cardStack = card.closest('.CardStack');
            const cardIndexInStack = Array.from(cardStack.children).indexOf(card);
            Object.assign(card.style, initialStyles.card);
            setCardPosition(card, cardIndexInStack, cardStack.children.length, cardStack.id || `stack-${Math.random().toString(36).substr(2, 9)}`);
        });
        const allStacks = document.querySelector('.AllStacks');
        Object.assign(allStacks.style, initialStyles.allStack);
        allStackLabels.forEach(label => {
            Object.assign(label.style, initialStyles.stackLabel);
        });
        allCardStacks.forEach((stack, index) => {
            setTimeout(() => {
                Object.assign(stack.style, initialStyles.cardStack);
            }, index * 50);
        });
        const otherCardStacks = document.querySelectorAll('.CardStack');
        const stackLabelValues = document.querySelectorAll('.StackLabelValue');
        setTimeout(() => {
            window.scrollTo({
                top: stackLabel.offsetTop,
                behavior: 'smooth'
            });
            otherCardStacks.forEach((otherCardStack) => {
                otherCardStack.style.pointerEvents = 'none';
            });
            stackLabelValues.forEach(stackLabelValue => {
                Object.assign(stackLabelValue.style, initialStyles.StackLabelValue);
            });
        }, 350);
        setTimeout(() => {
            otherCardStacks.forEach((otherCardStack) => {
                otherCardStack.style.opacity = '1';
                otherCardStack.style.filter = 'none';
            });
        }, 500); 
        setTimeout(() => {
            otherCardStacks.forEach((otherCardStack) => {
                otherCardStack.style.pointerEvents = 'auto';
            });
        }, 1000);
    }
}

setTimeout(() => {
    let attempts = 0;
    const maxAttempts = 5;
    const attemptInterval = 15;
    function attemptLazyLoad() {
        lazyLoadCards();
        attempts++;
        if (document.querySelectorAll('.Card[data-src]').length > 0 && attempts < maxAttempts) {
            setTimeout(attemptLazyLoad, attemptInterval);
        }
    }
    attemptLazyLoad();
}, 50);