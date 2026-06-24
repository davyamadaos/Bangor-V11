import { CONFIG, toGauge } from "./config.js";
import { loadData } from "./api.js";
import { render } from "./ui.js";
import { forecast } from "./forecast.js";
import { draw } from "./chart.js";

let selected = 24;
let data;

async function refresh() {

    data = await loadData();

    const f = forecast(data.series);

    data.estimatedLevel = f.current;
    data.estimatedGauge = toGauge(f.current);
    data.rate = f.rateCmHr;
    data.ageHours = 0;

    render(data);

    document.getElementById("epaImage").src = CONFIG.epaImage;

    draw(document.getElementById("chart"), data.series, f);
}

document.querySelectorAll("button").forEach(b => {
    b.onclick = () => {
        selected = +b.dataset.h;
        refresh();
    };
});

refresh();
setInterval(refresh, CONFIG.refreshMinutes * 60000);
