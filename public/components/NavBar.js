function opennavDynamicContainer() {    
    document.body.style.overflow = 'hidden';

    document.getElementById('navBarSegController').style.transition = 'opacity 0.25s';
        document.getElementById('navBarSegController').style.opacity = 0;
        document.getElementById('navBarSegController').style.visibility = 'hidden';

    document.getElementById('modalBGOverlay').style.transition = 'opacity 0.5s';
        document.getElementById('modalBGOverlay').style.visibility = 'visible';
        document.getElementById('modalBGOverlay').style.opacity = 1;

    document.getElementById('navDynamicContainer').style.transition = 'width 0.5s, height 0.5s, left 0.15s';
        document.getElementById('navDynamicContainer').style.width = 'calc(100vw - 80px)';
        document.getElementById('navDynamicContainer').style.maxWidth = '800px';
        document.getElementById('navDynamicContainer').style.height = 'calc(100vh - 80px)';
        document.getElementById('navDynamicContainer').style.maxHeight = '800px';
        document.getElementById('navDynamicContainer').style.left = 'calc(50% - 400px)';
        if (window.matchMedia("(max-width: 768px)").matches) {
            document.getElementById('chatinput').addEventListener('focus', function() {
                setTimeout(function() {
                    document.getElementById('navDynamicContainer').style.transition = 'height 0.5s, bottom 0.5s';
                    document.getElementById('navDynamicContainer').style.height = '50vh';
                    document.getElementById('navDynamicContainer').style.bottom = '-2px';
                    document.body.style.overflow = 'hidden';
                }, 500);
            });
            document.getElementById('chatinput').addEventListener('blur', function() {
                setTimeout(function() {
                    document.getElementById('navDynamicContainer').style.transition = 'height 0.5s, bottom 0.5s';
                    document.getElementById('navDynamicContainer').style.height = '100%';
                    document.getElementById('navDynamicContainer').style.bottom = '-2px';
                }, 500);
            });
            setTimeout(function() {
                document.getElementById('navDynamicContainer').style.borderRadius = '0px';
                document.getElementById('navDynamicContainer').style.height = '100%';
                document.getElementById('navDynamicContainer').style.maxHeight = '100dvh';
                document.getElementById('navDynamicContainer').style.width = '100vw';
                document.getElementById('navDynamicContainer').style.maxWidth = '100vw';
                document.getElementById('navDynamicContainer').style.left = '-4px';
                document.getElementById('navDynamicContainer').style.bottom = '-2px';
            }, 200);
        } else {
        }
    document.getElementById('chatModalContent').style.transition = 'visibility 1s, opacity 1s';
        document.getElementById('chatModalContent').style.visibility = 'visible';
        document.getElementById('chatModalContent').style.opacity = 1;

    document.getElementById('responseLog').style.transition = 'opacity 1s';
        document.getElementById('responseLog').style.opacity = 1;

    if (!window.matchMedia("(max-width: 768px)").matches) {
        setTimeout(function() {
            document.getElementById('chatinput').focus();
        }, 500);
    }
}

function closenavDynamicContainer() {
    document.body.style.overflow = 'scroll';
    
    document.getElementById('chatModalContent').style.transition = 'visibility 0.25s, opacity 0.25s';
        document.getElementById('chatModalContent').style.visibility = 'hidden';
        document.getElementById('chatModalContent').style.opacity = 0;

    document.getElementById('navDynamicContainer').style.transition = 'left 0.2s, bottom 0.2s, width 0.15s, height 0.15s';
        document.getElementById('navDynamicContainer').style.left = 'calc(50% - 232px)'; 
        document.getElementById('navDynamicContainer').style.bottom = '42px';   
        document.getElementById('navDynamicContainer').style.width = '456px';
        document.getElementById('navDynamicContainer').style.height = '64px';
        document.getElementById('navDynamicContainer').style.borderRadius = '40px';

    document.getElementById('responseLog').style.transition = 'opacity 0.25s';
        document.getElementById('responseLog').style.opacity = 0;

    document.getElementById('modalBGOverlay').style.transition = 'opacity 1s';
        document.getElementById('modalBGOverlay').style.opacity = 0;
        setTimeout(function() {
            document.getElementById('modalBGOverlay').style.visibility = 'hidden';
        }, 1000);

    document.getElementById('navBarSegController').style.visibility = 'visible';
    document.getElementById('navBarSegController').style.transition = 'opacity 1.5s';
    document.getElementById('navBarSegController').style.opacity = 1;
}