export const CALIBRATION = {

    // pixel position of known reference points
    yTop: 80,
    yBottom: 520,

    // real EPA values at those points
    levelTop: 100.0,
    levelBottom: 98.0
};

export function pixelToLevel(y) {

    const ratio =
        (y - CALIBRATION.yTop)
        / (CALIBRATION.yBottom - CALIBRATION.yTop);

    return (
        CALIBRATION.levelTop
        + ratio *
        (CALIBRATION.levelBottom - CALIBRATION.levelTop)
    );
}
