export function trend(rate) {

    if (rate > 1) {
        return { text: "▲ Rising " + rate.toFixed(1) + " cm/hr", class: "rising" };
    }

    if (rate < -1) {
        return { text: "▼ Falling " + Math.abs(rate).toFixed(1) + " cm/hr", class: "falling" };
    }

    return { text: "■ Steady", class: "steady" };
}
