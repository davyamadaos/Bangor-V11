import sharp from "sharp";
import axios from "axios";
import { pixelToLevel } from "./calibration.js";

export async function extractSeries(url) {

    const res = await axios.get(url, {
        responseType: "arraybuffer"
    });

    const image = sharp(res.data);
    const { data, info } = await image
        .greyscale()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;

    const series = [];

    // scan vertical slices of chart
    for (let x = 0; x < width; x += 5) {

        let bestY = null;
        let bestVal = 255;

        for (let y = 0; y < height; y++) {

            const idx = y * width + x;

            const val = data[idx];

            if (val < bestVal) {
                bestVal = val;
                bestY = y;
            }
        }

        if (bestY !== null) {

            series.push({
                time: new Date(Date.now() - (width - x) * 300000).toISOString(),
                level: pixelToLevel(bestY)
            });
        }
    }

    return series;
}
