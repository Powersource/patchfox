const nest = require("depnest");
const { h } = require("mutant");

exports.gives = nest("app.html.app");

exports.needs = nest({
    "app.page.errors": "first",
    "app.sync.goTo": "first",
    "app.sync.initialise": "first",
    "history.obs.location": "first",
    "history.sync.push": "first",
});

exports.create = function (api) {
    return nest("app.html.app", app);

    function app (initialTabs) {
        console.log("STARTING patchfox");

        const App = h("App", api.app.html.tabs({
            initial: initialTabs || api.settings.sync.get("patchbay.defaultTabs")
        }));

        api.app.sync.initialise(App);

        api.history.obs.location()(loc => {
            api.app.sync.goTo(loc || {});
        });

        return App;
    }
};
