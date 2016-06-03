/* exported doTransform, onTextFieldChange, onOkClick, onClick, doPull, cleanUp, editList*/
var editable = false;
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
    transform.expanded = false;
    return transform;
}

function editList() {
    "use strict";
    editable = !editable;
    $.list.editing = editable;
    if (editable) {
        $.edit.title = "done";
    } else {
        $.edit.title = "edit";
    }
}

function onNotify(e) {
    console.log("***** onNotify");
    console.log(JSON.stringify(e));
}

function updateUi() {
    "use strict";
    //console.log("updateUi");
    Alloy.Collections.todoItems.fetch();
    updateListViewUi();
}

function onOkClick() {
    "use strict";
    var newItem,
        moment = require("alloy/moment");
    if ($.textField.value.length > 1) {
        newItem = Alloy.createModel("todoItems", {
            creationDate : moment().valueOf(),
            todoText : $.textField.value
        });
        newItem.save();
        updateUi();
    }
    $.textField.blur();
    $.textField.value = "";
    $.trigger("notify", {"prop": "random string"});
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
    length = $.list.sections[e.sectionIndex].items.length;
    section = $.list.sections[e.sectionIndex];
    item = section.getItemAt(e.itemIndex);
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

    }
}

$.on("notify", onNotify);

$.list.addEventListener("delete", deleteItem);

$.list.addEventListener("itemclick", function(e) {
    "use strict";
    var item = e.section.getItemAt(e.itemIndex),
        height;
    if (e.accessoryClicked) {
        if (item.properties.expanded === true) {
            height = 50;
        } else {
            height = 100;
        }
        item.properties.height = height;
        item.properties.expanded = !item.properties.expanded;
        e.section.updateItemAt(e.itemIndex, item);
    } else {
        console.log("itemclick; " + JSON.stringify(item.properties));
    }

});

$.list.addEventListener("editaction", function(e) {
    "use strict";
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
