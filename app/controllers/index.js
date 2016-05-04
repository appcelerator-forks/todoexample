var overlayOpen = false;
function onClick() {
    overlayOpen = !overlayOpen;
    console.log("onClick: " + overlayOpen);
    if(overlayOpen) {
        $.button.title = Alloy.Globals.fontMap.cross;
    } else {
        $.button.title = Alloy.Globals.fontMap.plus;
    }
}

$.container.open();
