import fs from "fs";

import { extractLatest }
    from "./digitizer.js";

import { levelFromPixel }
    from "./scale.js";

const IMAGE_URL =
    "https://epawebapp.epa.ie/hydronet/output/internet/stations/CAS/33008/S/extralarge_3m_extralarge.png";

/*
TEMPORARY MANUAL SCALE.

Until OCR is added.
*/

const topLevel = 99.20;
const bottomLevel = 98.95;

async function run() {

    const latest =
        await extractLatest(
            IMAGE_URL
        );

    const epaLevel =
        levelFromPixel(
            latest.y,
            24,
            435,
            topLevel,
            bottomLevel
        );

    const output = {

        updated:
            new Date().toISOString(),

        epaLevel,

        estimatedLevel:
            epaLevel,

        ageHours: 0,

        rate: 0,

        forecast: {

            "1h": {
                level:
                    epaLevel
            },

            "3h": {
                level:
                    epaLevel
            },

            "6h": {
                level:
                    epaLevel
            }
        },

        series: []
    };

    fs.writeFileSync(
        "../data/latest.json",
        JSON.stringify(
            output,
            null,
            2
        )
    );

    console.log(
        "EPA level:",
        epaLevel.toFixed(3)
    );
}

run();
