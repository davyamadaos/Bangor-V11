import { CONFIG }
from "./config.js";

import { loadData }
from "./api.js";

import { updateUI }
from "./ui.js";

async function refresh() {

    try {

        const data =
            await loadData();

        updateUI(data);

        document
            .getElementById(
                "epaImage"
            )
            .src =
            CONFIG.epaImage;

    }

    catch (error) {

        console.error(error);
    }
}

refresh();

setInterval(

    refresh,

    CONFIG.refreshMinutes
    * 60000
);
