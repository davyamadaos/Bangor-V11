import axios from "axios";
import sharp from "sharp";

const URL =
    "https://epawebapp.epa.ie/hydronet/output/internet/stations/CAS/33008/S/extralarge_3m_extralarge.png";

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

    for (let x = 665; x >= 600; x--) {

        let highest = null;

        for (let y = 350; y <= 435; y++) {

            const i = (y * width + x) * 3;

            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (
                b > r + 20 &&
                b > g + 20
            ) {
                highest = y;
                break;
            }
        }

        if (
            highest !== null &&
            highest < 410
        ) {

            console.log(
                "Column:",
                x
            );

            console.log(
                "River Y:",
                highest
            );

            return {
                x,
                y: highest,
                count: 1
            };
        }
    }

    throw new Error(
        "River trace not found"
    );
}
