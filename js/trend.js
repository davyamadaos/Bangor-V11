export function getTrend(rateCmHr) {

    if (rateCmHr > 1) {

        return {
            text:
                "▲ Rising " +
                rateCmHr.toFixed(1) +
                " cm/hr",

            className:
                "rising"
        };
    }

    if (rateCmHr < -1) {

        return {
            text:
                "▼ Falling " +
                Math.abs(rateCmHr)
                    .toFixed(1) +
                " cm/hr",

            className:
                "falling"
        };
    }

    return {

        text: "■ Steady",

        className:
            "steady"
    };
}
