import fs from "fs";

import { extractLatest }
    from "./digitizer.js";

import { levelFromPixel }
    from "./scale.js";

const topLevel = 99.20;
const bottomLevel = 98.95;

async function run() {

    const latest =
        await extractLatest();

    console.log(
        "Latest X:",
        latest.x
    );

    console.log(
        "Latest Y:",
        latest.y
    );

    const epaLevel =
        levelFromPixel(
            latest.y,
            24,
            435,
            topLevel,
            bottomLevel
        );

    console.log(
        "EPA level:",
        epaLevel.toFixed(3)
    );

    const now =
        new Date().toISOString();

    const data = {

        updated: now,

        epaLevel: epaLevel,

        estimatedLevel: epaLevel,

        ageHours: 0,

        rate: 2,

        forecast: {

            "1h": {
                level: epaLevel
            },

            "3h": {
                level: epaLevel
            },

            "6h": {
                level: epaLevel
            }
        },

        series: [

            {
                time: now,
                level: epaLevel
            }
        ]
    };

    fs.writeFileSync(
        "../data/latest.json",
        JSON.stringify(
            data,
            null,
            2
        )
    );
}

run();
