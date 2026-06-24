export async function loadData() {

    const response = await fetch(
        "data/latest.json?t=" +
        Date.now()
    );

    if (!response.ok) {
        throw new Error(
            "Unable to load data."
        );
    }

    return await response.json();
}
