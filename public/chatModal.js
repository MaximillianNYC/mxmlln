window.onscroll = function() {
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    if (scrollY > 4) {
        displayAI();
    } else if (scrollY <= 100 || (window.innerHeight + scrollY) >= document.documentElement.scrollHeight - 400) {
        hideAI();
    }
};

function displayAI() {
    document.getElementById('AskMaxButton').style.transition = 'bottom 0.75s';
        document.getElementById('AskMaxButton').style.bottom = '40px';

    document.getElementById('fullscreenModal').style.transition = 'bottom 0.75s';
        document.getElementById('fullscreenModal').style.bottom = '38px';
}

function hideAI() {
    document.getElementById('AskMaxButton').style.transition = 'bottom 0.25s';
        document.getElementById('AskMaxButton').style.bottom = '-70px';

    document.getElementById('fullscreenModal').style.transition = 'bottom 0.25s';
        document.getElementById('fullscreenModal').style.bottom = '-70px';
}

function openFullscreenModal() {    
    document.body.style.overflow = 'hidden';

    document.getElementById('AskMaxButton').style.transition = 'opacity 0.25s';
        document.getElementById('AskMaxButton').style.opacity = 0;
        document.getElementById('AskMaxButton').style.visibility = 'hidden';

    document.getElementById('modalBGOverlay').style.transition = 'opacity 0.5s';
        document.getElementById('modalBGOverlay').style.visibility = 'visible';
        document.getElementById('modalBGOverlay').style.opacity = 1;

    document.getElementById('fullscreenModal').style.transition = 'width 0.5s, height 0.5s, left 0.15s';
        document.getElementById('fullscreenModal').style.width = 'calc(100vw - 80px)';
        document.getElementById('fullscreenModal').style.maxWidth = '800px';
        document.getElementById('fullscreenModal').style.height = 'calc(100vh - 80px)';
        document.getElementById('fullscreenModal').style.maxHeight = '800px';
        document.getElementById('fullscreenModal').style.left = 'calc(50% - 400px)';
        if (window.matchMedia("(max-width: 768px)").matches) {
            document.getElementById('chatinput').addEventListener('focus', function() {
                // Shrink the modal to fit the available space
                document.getElementById('fullscreenModal').style.height = '50dvh';
                document.getElementById('fullscreenModal').style.bottom = '0px';
                document.body.style.overflow = 'hidden';
            });
            // Listen for blur event on input fields
            document.getElementById('chatinput').addEventListener('blur', function() {
                // Resize the modal to its original size
                document.getElementById('fullscreenModal').style.height = '100%';
                document.getElementById('fullscreenModal').style.bottom = '0px';
            });
            document.getElementById('fullscreenModal').style.borderRadius = '0px';
            document.getElementById('fullscreenModal').style.height = '100%';
            document.getElementById('fullscreenModal').style.maxHeight = '100dvh';
            document.getElementById('fullscreenModal').style.width = '100vw';
            document.getElementById('fullscreenModal').style.maxWidth = '100vw';
            document.getElementById('fullscreenModal').style.left = '-2px';
            document.getElementById('fullscreenModal').style.bottom = '-2px';
        } else {
        }
    document.getElementById('modal-content').style.transition = 'visibility 1s, opacity 1s';
        document.getElementById('modal-content').style.visibility = 'visible';
        document.getElementById('modal-content').style.opacity = 1;

    document.getElementById('responseLog').style.transition = 'opacity 1s';
        document.getElementById('responseLog').style.opacity = 1;

    setTimeout(function() {
        document.getElementById('chatinput').focus();
    }, 500);
}

function closeFullscreenModal() {
    document.body.style.overflow = 'scroll';
    
    document.getElementById('modal-content').style.transition = 'visibility 0.25s, opacity 0.25s';
        document.getElementById('modal-content').style.visibility = 'hidden';
        document.getElementById('modal-content').style.opacity = 0;

    document.getElementById('fullscreenModal').style.transition = 'left 0.2s, bottom 0.2s, width 0.15s, height 0.15s';
        document.getElementById('fullscreenModal').style.left = 'calc(50% - 152px)'; 
        document.getElementById('fullscreenModal').style.bottom = '38px';   
        document.getElementById('fullscreenModal').style.width = '300px';
        document.getElementById('fullscreenModal').style.height = '55px';
        document.getElementById('fullscreenModal').style.borderRadius = '40px';

    document.getElementById('responseLog').style.transition = 'opacity 0.25s';
        document.getElementById('responseLog').style.opacity = 0;

    document.getElementById('modalBGOverlay').style.transition = 'opacity 1s';
        document.getElementById('modalBGOverlay').style.opacity = 0;
        setTimeout(function() {
            document.getElementById('modalBGOverlay').style.visibility = 'hidden';
        }, 1000);

    document.getElementById('AskMaxButton').style.visibility = 'visible';
    document.getElementById('AskMaxButton').style.transition = 'opacity 1.5s';
        document.getElementById('AskMaxButton').style.opacity = 1;
}