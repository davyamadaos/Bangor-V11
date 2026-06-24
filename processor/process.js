import fs from "fs";
import { extractSeries } from "./digitizer.js";
import { forecast } from "./forecast.js";

const IMAGE_URL =
    "https://epawebapp.epa.ie/hydronet/output/internet/stations/CAS/33008/S/extralarge_3m_extralarge.png";

async function run() {

    const series =
        await extractSeries(
            IMAGE_URL
        );

    const f =
        forecast(series);

    const latest = {

        updated:
            new Date().toISOString(),

        epaLevel:
            series.at(-1).level,

        estimatedLevel:
            f.current,

        ageHours: 0,

        rate:
            f.rateCmHr,

        forecast: {

            "1h": {
                level:
                    f.plus1
            },

            "3h": {
                level:
                    f.plus3
            },

            "6h": {
                level:
                    f.plus6
            }
        },

        series
    };

    fs.writeFileSync(
        "../data/latest.json",
        JSON.stringify(
            latest,
            null,
            2
        )
    );

    console.log(
        "latest.json updated"
    );
}

run();
