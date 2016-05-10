/* exported doTransform, onTextFieldChange, onOkClick, onClick, doPull, cleanUp, editList*/
var overlayOpen = false,
    editable = false;
Alloy.Collections.todoItems.fetch();
function doTransform(model) {
    "use strict";
    //console.log("*** doTransform");
    var transform = model.toJSON(),
        initial = transform.todoText.substring(0, 1).toUpperCase();
    transform.template = "basic";
    transform.bgColor = Alloy.Globals.palette[initial];
    transform.selectionStyle = OS_IOS ? Ti.UI.iPhone.ListViewCellSelectionStyle.NONE : null;
    transform.iconInitial = initial;
    transform.title = transform.todoText;
    transform.canEdit = true;
    transform.expanded = false;
    return transform;

}

function editList() {
    editable = !editable;
    $.list.editing = editable;
    if (editable) {
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
    $.textField.blur();
    newItem = Alloy.createModel("todoItems", {
        creationDate : moment().valueOf(),
        todoText : $.textField.value
    });
    newItem.save();
    $.textField.value="";
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

function deleteItem(e) {
    "use strict";
    var section,
        item,
        model,
        length;
    e = e || {};
    console.log("**** delete listener");
    length = $.list.sections[e.sectionIndex].items.length;
    section = $.list.sections[e.sectionIndex];
    item = section.getItemAt(e.itemIndex);
    console.log("item: " + JSON.stringify(item));
    if (item && item.uuid && item.uuid.text) {
        console.log(JSON.stringify(item.uuid.text));
        model = Alloy.Collections.todoItems.get(item.uuid.text);
        if (model) {
            console.log(JSON.stringify(model));
            Alloy.Collections.todoItems.remove(model);
            model.destroy();
        } else {
            console.error("cannot delete model");
        }

    } else {
        console.error("cannot retrieve id.  Length of view: " + length);
    }
}

$.list.addEventListener("delete", deleteItem);

$.list.addEventListener("itemclick", function(e) {
    var item = e.section.getItemAt(e.itemIndex);
    if (e.accessoryClicked) {
        item.properties.height = 100;
        e.section.updateItemAt(e.itemIndex, item);
    } else {
        console.log("itemclick; " + JSON.stringify(item.properties));
    }

});

$.list.addEventListener("editaction", function(e) {
    switch(e.action) {
        case "DELETE":
            deleteItem(e);
            break;
        default:
            console.log("editactions: " + JSON.stringify(e));
            break;
    }
});
$.container.open();
