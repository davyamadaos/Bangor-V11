export function fmtLevel(v) {
    return Number(v).toFixed(2) + " m";
}

export function fmtGauge(v) {
    return "Gauge " + Number(v).toFixed(2);
}

export function fmtTime(t) {
    return new Date(t).toLocaleTimeString("en-IE", {
        hour: "2-digit",
        minute: "2-digit"
    });
}
