export const CONFIG = {

    refreshMinutes: 15,

    epaImage:
        "https://epawebapp.epa.ie/hydronet/output/internet/stations/CAS/33008/S/extralarge_3m_extralarge.png"
};

export function toGauge(level) {

    return (
        14.664 * level
        - 1452
    );
}
