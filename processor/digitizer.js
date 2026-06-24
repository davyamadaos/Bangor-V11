import axios from "axios";
import sharp from "sharp";

const URL =
    "https://epawebapp.epa.ie/hydronet/output/internet/stations/CAS/33008/S/extralarge_3m_extralarge.png";

const LEFT = 65;
const RIGHT = 672;

const TOP = 24;
const BOTTOM = 435;

export async function extractLatest() {

    const response =
        await axios.get(URL, {
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
        let x = RIGHT;
        x >= RIGHT - 60;
        x--
    ) {

        const ys = [];

        for (
            let y = TOP;
            y <= BOTTOM;
            y++
        ) {

            const i =
                (y * width + x) * 3;

            const r = data[i];

            const g = data[i + 1];

            const b = data[i + 2];

            if (
                b > 120 &&
                b > r + 25 &&
                b > g + 25
            ) {
                ys.push(y);
            }
        }

        if (ys.length > 0) {

            latestX = x;

            ys.sort((a, b) => a - b);

latestY =
    ys[Math.floor(ys.length / 2)];

            break;
        }
    }

    return {

        x: latestX,

        y: latestY
    };
}
