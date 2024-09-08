//CHAT VIEW
function openNavChatView() {    
    document.body.style.overflow = 'hidden';

    document.getElementById('navBarSegController').style.transition = 'opacity 0.25s';
        document.getElementById('navBarSegController').style.opacity = 0;
        document.getElementById('navBarSegController').style.visibility = 'hidden';
        document.getElementById('navBar').style.bottom = '-40px';

    document.getElementById('modalBGOverlay').style.transition = 'opacity 0.5s';
        document.getElementById('modalBGOverlay').style.visibility = 'visible';
        document.getElementById('modalBGOverlay').style.opacity = 1;

    document.getElementById('navDynamicContainer').style.transition = 'width 0.5s, height 0.5s, left 0.15s';
        document.getElementById('navDynamicContainer').style.width = 'calc(100vw - 80px)';
        document.getElementById('navDynamicContainer').style.maxWidth = '800px';
        document.getElementById('navDynamicContainer').style.height = 'calc(100vh - 80px)';
        document.getElementById('navDynamicContainer').style.maxHeight = '800px';
        document.getElementById('navDynamicContainer').style.left = 'calc(50% - 400px)';
        document.getElementById('navDynamicContainer').style.background = 'linear-gradient(45deg, rgba(221, 249, 255, 0.85), rgba(229, 221, 255, 0.85), rgba(254, 231, 224, 0.85))';
        document.getElementById('navDynamicContainer').style.animation = 'gradient 5s ease infinite';
        document.getElementById('navDynamicContainer').style.backgroundSize = '400% 400%';

        if (window.matchMedia("(max-width: 768px)").matches) {
            document.getElementById('chatInputField').addEventListener('focus', function() {
                setTimeout(function() {
                    document.getElementById('navDynamicContainer').style.transition = 'height 0.5s, bottom 0.5s';
                    document.getElementById('navDynamicContainer').style.height = '50vh';
                    document.getElementById('navDynamicContainer').style.bottom = '-2px';
                    document.body.style.overflow = 'hidden';
                }, 500);
            });
            document.getElementById('chatInputField').addEventListener('blur', function() {
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
    document.getElementById('chatViewContent').style.transition = 'visibility 1s, opacity 1s';
        document.getElementById('chatViewContent').style.visibility = 'visible';
        document.getElementById('chatViewContent').style.opacity = 1;

    document.getElementById('chatResponseLog').style.transition = 'opacity 1s';
        document.getElementById('chatResponseLog').style.opacity = 1;

    if (!window.matchMedia("(max-width: 768px)").matches) {
        setTimeout(function() {
            document.getElementById('chatInputField').focus();
        }, 500);
    }
}

//CONTACT VIEW
function openNavContactView() {    
    document.body.style.overflow = 'hidden';

    //HIDE CONTROLS
    document.getElementById('navBarSegController').style.transition = 'opacity 0.25s';
        document.getElementById('navBarSegController').style.opacity = 0;
        document.getElementById('navBarSegController').style.visibility = 'hidden';
        document.getElementById('navBar').style.bottom = '-40px';

    //DISPLAY OVERLAY
    document.getElementById('modalBGOverlay').style.transition = 'opacity 0.5s';
        document.getElementById('modalBGOverlay').style.visibility = 'visible';
        document.getElementById('modalBGOverlay').style.opacity = 1;

    //EXPAND CONTAINER
    document.getElementById('navDynamicContainer').style.transition = 'width 0.5s, height 0.5s, left 0.15s';
        document.getElementById('navDynamicContainer').style.height = '220px';

        if (window.matchMedia("(max-width: 768px)").matches) {
            document.getElementById('chatInputField').addEventListener('focus', function() {
                setTimeout(function() {
                    document.getElementById('navDynamicContainer').style.transition = 'height 0.5s, bottom 0.5s';
                    document.getElementById('navDynamicContainer').style.height = '50vh';
                    document.getElementById('navDynamicContainer').style.bottom = '-2px';
                    document.body.style.overflow = 'hidden';
                }, 500);
            });
            document.getElementById('chatInputField').addEventListener('blur', function() {
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
    document.getElementById('contactViewContent').style.transition = 'visibility 1s, opacity 1.5s';
    document.getElementById('contactViewContent').style.visibility = 'visible';
    setTimeout(() => {
        document.getElementById('contactViewContent').style.opacity = '1';
    }, 50);
}

function closeNavChatView() {
    document.body.style.overflow = 'scroll';
    
    document.getElementById('chatViewContent').style.transition = 'visibility 0.15s, opacity 0.15s';
        document.getElementById('chatViewContent').style.visibility = 'hidden';
        document.getElementById('chatViewContent').style.opacity = 0;
        document.getElementById('chatViewContent').style.zIndex = '-1';

    document.getElementById('navDynamicContainer').style.transition = 'left 0.2s, bottom 0.2s, width 0.15s, height 0.15s';
        document.getElementById('navDynamicContainer').style.left = 'calc(50% - 232px)'; 
        document.getElementById('navDynamicContainer').style.bottom = '42px';   
        document.getElementById('navDynamicContainer').style.width = '456px';
        document.getElementById('navDynamicContainer').style.height = '64px';
        document.getElementById('navDynamicContainer').style.borderRadius = '40px';
        document.getElementById('navDynamicContainer').style.background = 'rgba(240, 240, 240, 0.75)';

    document.getElementById('chatResponseLog').style.transition = 'opacity 0.25s';
        document.getElementById('chatResponseLog').style.opacity = 0;

    document.getElementById('modalBGOverlay').style.transition = 'opacity 1s';
        document.getElementById('modalBGOverlay').style.opacity = 0;
        setTimeout(function() {
            document.getElementById('modalBGOverlay').style.visibility = 'hidden';
        }, 1000);

    document.getElementById('navBar').style.bottom = '0px';
    document.getElementById('navBarSegController').style.visibility = 'visible';
    document.getElementById('navBarSegController').style.transition = 'opacity 1.5s';
    document.getElementById('navBarSegController').style.opacity = 1;
}