import sharp from "sharp";
import axios from "axios";
import { PLOT, SEARCH } from "./calibration.js";

export async function extractLatest(url) {

    const response =
        await axios.get(url, {
            responseType: "arraybuffer"
        });

    const image =
        sharp(response.data);

    const { data, info } =
        await image
            .raw()
            .toBuffer({
                resolveWithObject: true
            });

    const width =
        info.width;

    let latestX = null;
    let latestY = null;

    for (
        let x = PLOT.right - SEARCH.rightMargin;
        x > PLOT.right - SEARCH.maxBacktrack;
        x--
    ) {

        let found = [];

        for (
            let y = PLOT.top;
            y <= PLOT.bottom;
            y++
        ) {

            const idx =
                (y * width + x) * 3;

            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            if (
                b > r + SEARCH.blueThreshold &&
                b > g + SEARCH.blueThreshold
            ) {
                found.push(y);
            }
        }

        if (found.length > 0) {

            latestX = x;

            latestY =
                found.reduce((a, b) => a + b, 0)
                / found.length;

            break;
        }
    }

    return {
        x: latestX,
        y: latestY
    };
}
