import { CONFIG } from "./config.js";
import { loadData } from "./api.js";
import { render } from "./ui.js";
import { draw } from "./chart.js";

let selected = 24;

async function refresh() {

    const data = await loadData();

    document.getElementById(
        "epaImage"
    ).src = CONFIG.epaImage;

    render(data);

    draw(
        document.getElementById("chart"),
        data
    );
}

document.querySelectorAll("button")
.forEach(button => {

    button.onclick = () => {

        selected = +button.dataset.h;

        document
            .querySelectorAll("button")
            .forEach(b =>
                b.classList.remove("active")
            );

        button.classList.add("active");

        refresh();
    };
});

refresh();

setInterval(
    refresh,
    CONFIG.refreshMinutes * 60000
);
