# Features History

<!-- Completed features are appended here by /feature complete -->

## Globe Interactivity

**Branch:** `globe-interactivity`
**Completed:** 2026-04-20

### Goals
- Clicking a country dot on the globe opens a detail card showing the country's flag, capital, and population
- Country dots are color-coded by continent — each continent has a distinct color
- The detail card can be closed (click away or close button)
- Continent color legend is visible so users know which color maps to which continent

### Summary
Added a full 3D globe view to the Countries page using `react-globe.gl`. Country dots are color-coded by continent via `CONTINENT_COLORS`. Clicking a dot opens a focus-trapped `CountryCard` (closable via Escape or click-outside). A `ContinentLegend` overlay and a hint text are shown when no card is open. The globe is toggled via a List/Globe button group in `CountriesPageClient`. Also fixed a browser `:visited` color bug in the Alphabet filter by replacing `<a href="#">` with `<button>` elements.
