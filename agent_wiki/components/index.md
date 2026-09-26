# Components

One concept per real module or subsystem, each bound to what it describes with
a `resource` pointing at the path in the repository. This is the layer that
goes stale fastest, so a component concept says what the module is *for* and
what its contract is — not a line-by-line account of code that git already
tracks.

Use `type: Component`.

* [Shared interface](shared-ui.md) — tokens, styles, quiz, choices, « Informations ».
* [CSV import plugin](csv-build-plugin.md) — CSV to data at build time.
* [Cathedral experience](cathedral-experience.md) — eight steps, activities and quiz.
