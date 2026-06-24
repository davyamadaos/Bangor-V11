import axios from "axios";
import sharp from "sharp";

const URL =
    "https://epawebapp.epa.ie/hydronet/output/internet/stations/CAS/33008/S/extralarge_3m_extralarge.png";

const LEFT = 65;
const RIGHT = 650;

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

    const width = info.width;

    for (
        let x = RIGHT;
        x >= 560;
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
                b > 150 &&
                b > r + 40 &&
                b > g + 40
            ) {
                ys.push(y);
            }
        }

        // Ignore tiny groups.

        if (ys.length >= 8) {

            ys.sort((a, b) => a - b);

            const y =
                ys[Math.floor(
                    ys.length / 2
                )];

            return {
                x,
                y,
                count: ys.length
            };
        }
    }

    throw new Error(
        "No river trace found"
    );
}
