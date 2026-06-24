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

    for (let x = 670; x >= 620; x--) {

        const ys = [];

        for (let y = 24; y <= 435; y++) {

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

        if (ys.length >= 10) {

            console.log(
                "Column:",
                x
            );

            console.log(
                "Count:",
                ys.length
            );

            console.log(
                "Min:",
                ys[0]
            );

            console.log(
                "Max:",
                ys[ys.length - 1]
            );

            return {
                x,
                y: ys[ys.length - 1],
                count: ys.length
            };
        }
    }

    throw new Error(
        "River trace not found"
    );
}
