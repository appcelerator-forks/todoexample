exports.definition = {
    config: {
        adapter: {
            "type": "properties",
            "collection_name": "todoItems"
        }
    },
    extendModel: function(Model) {
        "use strict";
        _.extend(Model.prototype, {
            // extended functions and properties go here
        });
        return Model;
    },
    extendCollection: function(Collection) {
        "use strict";
        _.extend(Collection.prototype, {
            // extended functions and properties go here

            // For Backbone v1.1.2, uncomment the following to override the
            // fetch method to account for a breaking change in Backbone.
            /*
            fetch: function(options) {
                options = options ? _.clone(options) : {};
                options.reset = true;
                return Backbone.Collection.prototype.fetch.call(this, options);
            }
            */
            //note the negative to get reverse order - newest at top!
            comparator: function(item) {
                return -item.get("creationDate");
            }
        });

        return Collection;
    }
};
