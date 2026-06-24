import { fmtLevel, fmtGauge } from "./utils.js";
import { trend } from "./trend.js";

export function render(data) {

    document.getElementById("currentLevel").textContent =
        fmtLevel(data.estimatedLevel);

    document.getElementById("currentGauge").textContent =
        fmtGauge(data.estimatedGauge);

    document.getElementById("epaLevel").textContent =
        fmtLevel(data.epaLevel);

    document.getElementById("epaGauge").textContent =
        fmtGauge(data.epaGauge);

    document.getElementById("epaAge").textContent =
        data.ageHours.toFixed(1) + "h old";

    const t = trend(data.rate);

    const el = document.getElementById("trend");

    el.textContent = t.text;
    el.className = t.class;
}
