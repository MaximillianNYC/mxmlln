function setDefaultCardStackStyles() {
    const cardStacks = document.querySelectorAll('.CardStack');
    cardStacks.forEach(cardStack => {
        cardStack.style.position = 'relative';
        cardStack.style.height = '600px';
        cardStack.style.width = '600px';
        cardStack.style.top = '0px';
        cardStack.style.left = '0px';
        cardStack.style.display = 'flex';
        cardStack.style.flexDirection = 'column';
        cardStack.style.alignItems = 'center';
        cardStack.style.justifyContent = 'center';
        // cardStack.style.gap = '10px';
        cardStack.style.transition = 'all 0.5s ease';
        cardStack.style.backgroundColor = 'blue';
    });
}

function randomizeCardStack() {
    setDefaultCardStackStyles();
    const cards = document.querySelectorAll('.CardStack > .StackedCard');
    cards.forEach((card, index) => {
        const rotation = Math.random() * 40 - 20;
        const zIndex = 1000 - (index * 50);
        const marginTop = Math.random() * 20 - 10;
        const marginLeft = Math.random() * 20 - 10;
        card.style.transform = `rotate(${rotation}deg)`;
        card.style.zIndex = zIndex;
        card.style.marginTop = `${marginTop}px`;
        card.style.marginLeft = `${marginLeft}px`;
        card.style.position = 'absolute';
    });
}

function randomizeTimelinePhotos() {
    const photoAlbums = document.querySelectorAll('.timelinePhotoAlbum');
    photoAlbums.forEach(album => {
        const photos = album.querySelectorAll('.timelinePhoto');
        photos.forEach((photo, index) => {
//            const rotation = Math.random() * 20 - 15;
            let rotation;
            if (index === 0) {
                rotation = Math.random() * 21 - 15; // Specific range for the first photo
            } else if (index === 1) {
                rotation = Math.random() * 12 - 9; // Different range for the second photo
            } else {
                rotation = Math.random() * 5 - 0; // Different range for the third photo
            }
            photo.style.transform = `
                rotate(${rotation}deg)
                translate(${80 * index}%, 0px)
            `;
            photo.style.marginTop = '30px';
            if (index === Math.floor(photos.length / 2)) {
                photo.style.zIndex = Math.min(9999, 500);
            }
        });
    });
}

function expandCardStack(event) {
    event.preventDefault();
    const cardStack = event.currentTarget;
    if (cardStack.classList.contains('expanded')) {
        cardStack.classList.remove('expanded');
        cardStack.style.zIndex = '';
        cardStack.style.width = '';
        cardStack.style.height = '';
        cardStack.style.backgroundColor = '';
        setTimeout(() => {
            cardStack.style.position = '';

            cardStack.style.top = '';
            cardStack.style.left = '';
        }, 300); // Delay position change for smoother animation
    } else {
        cardStack.classList.add('expanded');
        cardStack.style.zIndex = '9999';
        cardStack.style.width = '100vw';
        cardStack.style.height = '100dvh';
        setTimeout(() => {
            cardStack.style.top = '0px';
            cardStack.style.position = 'absolute';

            cardStack.style.left = '0px';
        }, 300); // Delay position change for smoother animation
    }
}

document.addEventListener('DOMContentLoaded', () => {
    randomizeCardStack();
    const cardStacks = document.querySelectorAll('.CardStack');
    cardStacks.forEach(cardStack => {
        cardStack.addEventListener('click', expandCardStack);
    });
    randomizeTimelinePhotos();
});