import { CONFIG } from "./config.js";
import { loadData } from "./api.js";
import { render } from "./ui.js";
import { draw } from "./chart.js";

let selected = 24;

async function refresh() {

    try {

        const data = await loadData();

        document.getElementById(
            "epaImage"
        ).src = CONFIG.epaImage;

        render(data);

        draw(
            document.getElementById("chart"),
            data
        );

    } catch (err) {

        console.error(err);
    }
}

document.querySelectorAll("button")
.forEach(button => {

    button.onclick = () => {

        document
            .querySelectorAll("button")
            .forEach(b =>
                b.classList.remove("active")
            );

        button.classList.add("active");

        selected = +button.dataset.h;

        refresh();
    };
});

refresh();

setInterval(
    refresh,
    CONFIG.refreshMinutes * 60000
);
