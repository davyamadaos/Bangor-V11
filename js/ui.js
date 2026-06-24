import {
    formatLevel,
    formatGauge,
    formatTime
}
from "./utils.js";

import {
    getTrend
}
from "./trend.js";

export function updateUI(data) {

    document
        .getElementById(
            "currentLevel"
        )
        .textContent =
        formatLevel(
            data.estimatedLevel
        );

    document
        .getElementById(
            "currentGauge"
        )
        .textContent =
        formatGauge(
            data.estimatedGauge
        );

    document
        .getElementById(
            "epaLevel"
        )
        .textContent =
        formatLevel(
            data.epaLevel
        );

    document
        .getElementById(
            "epaGauge"
        )
        .textContent =
        formatGauge(
            data.epaGauge
        );

    document
        .getElementById(
            "epaAge"
        )
        .textContent =
        data.ageHours.toFixed(1)
        + " hours old";

    const trend =
        getTrend(data.rate);

    const trendDiv =
        document.getElementById(
            "trend"
        );

    trendDiv.textContent =
        trend.text;

    trendDiv.className =
        trend.className;

    document
        .getElementById(
            "f1Level"
        )
        .textContent =
        formatLevel(
            data.forecast["1h"].level
        );

    document
        .getElementById(
            "f1Gauge"
        )
        .textContent =
        formatGauge(
            data.forecast["1h"].gauge
        );

    document
        .getElementById(
            "f3Level"
        )
        .textContent =
        formatLevel(
            data.forecast["3h"].level
        );

    document
        .getElementById(
            "f3Gauge"
        )
        .textContent =
        formatGauge(
            data.forecast["3h"].gauge
        );

    document
        .getElementById(
            "f6Level"
        )
        .textContent =
        formatLevel(
            data.forecast["6h"].level
        );

    document
        .getElementById(
            "f6Gauge"
        )
        .textContent =
        formatGauge(
            data.forecast["6h"].gauge
        );

    document
        .getElementById(
            "updatedTime"
        )
        .textContent =
        formatTime(
            data.updated
        );
}
