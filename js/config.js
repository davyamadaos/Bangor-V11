export const CONFIG = {

    station: "33008",

    stationName: "Bangor River",

    refreshMinutes: 15,

    epaImage:
        "https://epawebapp.epa.ie/hydronet/output/internet/stations/CAS/33008/S/extralarge_3m_extralarge.png",

    forecastHours: [1, 3, 6],

    gaugeMultiplier: 16.921,

    gaugeOffset: 1675.7,

    risingThreshold: 1,

    fallingThreshold: -1

};

export function gauge(level) {

    return (
        CONFIG.gaugeMultiplier * level
        - CONFIG.gaugeOffset
    );
}
