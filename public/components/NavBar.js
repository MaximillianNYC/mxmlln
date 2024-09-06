

function openFullscreenModal() {    
    document.body.style.overflow = 'hidden';

    document.getElementById('navBarSegController').style.transition = 'opacity 0.25s';
        document.getElementById('navBarSegController').style.opacity = 0;
        document.getElementById('navBarSegController').style.visibility = 'hidden';

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
                setTimeout(function() {
                    document.getElementById('fullscreenModal').style.transition = 'height 0.5s, bottom 0.5s';
                    document.getElementById('fullscreenModal').style.height = '50vh';
                    document.getElementById('fullscreenModal').style.bottom = '-2px';
                    document.body.style.overflow = 'hidden';
                }, 500);
            });
            document.getElementById('chatinput').addEventListener('blur', function() {
                setTimeout(function() {
                    document.getElementById('fullscreenModal').style.transition = 'height 0.5s, bottom 0.5s';
                    document.getElementById('fullscreenModal').style.height = '100%';
                    document.getElementById('fullscreenModal').style.bottom = '-2px';
                }, 500);
            });
            setTimeout(function() {
                document.getElementById('fullscreenModal').style.borderRadius = '0px';
                document.getElementById('fullscreenModal').style.height = '100%';
                document.getElementById('fullscreenModal').style.maxHeight = '100dvh';
                document.getElementById('fullscreenModal').style.width = '100vw';
                document.getElementById('fullscreenModal').style.maxWidth = '100vw';
                document.getElementById('fullscreenModal').style.left = '-4px';
                document.getElementById('fullscreenModal').style.bottom = '-2px';
            }, 200);
        } else {
        }
    document.getElementById('modal-content').style.transition = 'visibility 1s, opacity 1s';
        document.getElementById('modal-content').style.visibility = 'visible';
        document.getElementById('modal-content').style.opacity = 1;

    document.getElementById('responseLog').style.transition = 'opacity 1s';
        document.getElementById('responseLog').style.opacity = 1;

    if (!window.matchMedia("(max-width: 768px)").matches) {
        setTimeout(function() {
            document.getElementById('chatinput').focus();
        }, 500);
    }
}

function closeFullscreenModal() {
    document.body.style.overflow = 'scroll';
    
    document.getElementById('modal-content').style.transition = 'visibility 0.25s, opacity 0.25s';
        document.getElementById('modal-content').style.visibility = 'hidden';
        document.getElementById('modal-content').style.opacity = 0;

    document.getElementById('fullscreenModal').style.transition = 'left 0.2s, bottom 0.2s, width 0.15s, height 0.15s';
        document.getElementById('fullscreenModal').style.left = 'calc(50% - 232px)'; 
        document.getElementById('fullscreenModal').style.bottom = '42px';   
        document.getElementById('fullscreenModal').style.width = '456px';
        document.getElementById('fullscreenModal').style.height = '64px';
        document.getElementById('fullscreenModal').style.borderRadius = '40px';

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