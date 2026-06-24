import axios from "axios";
import sharp from "sharp";

const URL =
    "https://epawebapp.epa.ie/hydronet/output/internet/stations/CAS/33008/S/extralarge_3m_extralarge.png";

const MIN_Y = 350;
const MAX_Y = 435;

export async function extractLatest() {

    const response = await axios.get(URL, {
        responseType: "arraybuffer"
    });

    const image = sharp(response.data);

    const { data, info } =
        await image
            .raw()
            .toBuffer({
                resolveWithObject: true
            });

    const width = info.width;

    for (let x = 665; x >= 620; x--) {

        const ys = [];

        for (let y = MIN_Y; y <= MAX_Y; y++) {

            const i = (y * width + x) * 3;

            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (
                b > r + 20 &&
                b > g + 20
            ) {
                ys.push(y);
            }
        }

        if (ys.length < 2)
            continue;

        const groups = [];

        let current = [ys[0]];

        for (let i = 1; i < ys.length; i++) {

            if (ys[i] <= ys[i - 1] + 20) {
                current.push(ys[i]);
            }
            else {
                groups.push(current);
                current = [ys[i]];
            }
        }

        groups.push(current);

        console.log("Column:", x);

        groups.forEach(g => {
            console.log(
                g[0],
                "-",
                g[g.length - 1]
            );
        });

        const river =
            groups[0];

        return {
            x,
            y: river[0],
            count: river.length
        };
    }

    throw new Error(
        "River trace not found"
    );
}
