export function formatLevel(level) {

    return Number(level)
        .toFixed(2) + " m";
}

export function formatGauge(value) {

    return "Gauge " +
        Number(value)
        .toFixed(2);
}

export function formatRate(rate) {

    return Math.abs(rate)
        .toFixed(1) +
        " cm/hr";
}

export function formatTime(dateString) {

    const d = new Date(dateString);

    return d.toLocaleTimeString(
        "en-IE",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}

export function hoursOld(dateString) {

    const then = new Date(dateString);

    const now = new Date();

    return (
        (now - then)
        / 3600000
    ).toFixed(1);
}
