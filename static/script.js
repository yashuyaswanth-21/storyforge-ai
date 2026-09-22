async function createStory() {

    const story = document.getElementById("story").value;
    const result = document.getElementById("result");

    if (!story.trim()) {
        result.innerHTML = "<p>Please enter a story.</p>";
        return;
    }

    result.innerHTML = "<p>Creating story...</p>";

    try {

        const response = await fetch("/create-story", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                story: story
            })
        });

        const data = await response.json();

        if (data.success) {

            result.innerHTML = `
                <h2>Story Created 🎬</h2>
                <p>${data.story}</p>
            `;

        } else {

            result.innerHTML = `
                <p>${data.message}</p>
            `;

        }

    } catch (error) {

        result.innerHTML = `
            <p>Something went wrong.</p>
        `;

        console.error(error);
    }
}