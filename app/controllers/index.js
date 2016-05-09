/* exported doTransform, onTextFieldChange, onOkClick, onClick, doPull, cleanUp, editList*/
var overlayOpen = false,
    editable = false;
Alloy.Collections.todoItems.fetch();
function doTransform(model) {
    "use strict";
    var transform = model.toJSON(),
        initial = transform.todoText.substring(0, 1).toUpperCase();
    transform.template = "basic";
    transform.bgColor = Alloy.Globals.palette[initial];
    transform.selectionStyle = OS_IOS ? Ti.UI.iPhone.ListViewCellSelectionStyle.NONE : null;
    transform.iconInitial = initial;
    transform.title = transform.todoText;
    transform.canEdit = true;
    return transform;

}

function editList() {
    editable = !editable;
    $.list.editing = editable;
    if(editable) {
        $.edit.title = "done";
        $.button.hide();
    } else {
        $.edit.title = "edit";
        $.button.show();
    }
}

function updateUi() {
    "use strict";
    console.log("updateUi");
    Alloy.Collections.todoItems.fetch();
    updateListViewUi();
}


function onTextFieldChange() {
    "use strict";
    if ($.textField.value.length > 1) {
        $.okbutton.show();
    } else {
        $.okbutton.hide();
    }
}

function onOkClick() {
    "use strict";
    var newItem,
        moment = require("alloy/moment");
    overlayOpen = !overlayOpen;
    newItem = Alloy.createModel("todoItems", {
        creationDate : moment().valueOf(),
        todoText : $.textField.value
    });
    newItem.save();
    $.button.title = Alloy.Globals.fontMap.plus;
    $.overlay.hide();
    updateUi();
}

function onClick() {
    "use strict";
    overlayOpen = !overlayOpen;
    console.log("onClick: " + overlayOpen);
    if (overlayOpen) {
        $.button.title = Alloy.Globals.fontMap.cross;
        $.overlay.show();
    } else {
        $.button.title = Alloy.Globals.fontMap.plus;
        $.overlay.hide();
    }
}


function doPull() {
    "use strict";
    console.log("doPull");
    updateUi();
}

function cleanUp() {
    "use strict";
    $.destroy();
}

Alloy.Collections.todoItems.on("change", function(){
    "use strict";
    console.log("changed");
});

$.container.open();
