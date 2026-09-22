async function analyzeStory() {

    const story = document.getElementById("story").value.trim();

    const result = document.getElementById("result");
    const error = document.getElementById("error");

    // Clear previous messages
    error.style.display = "none";
    result.style.display = "none";

    // Check story
    if (!story) {
        error.textContent = "Please enter a story first.";
        error.style.display = "block";
        return;
    }

    try {

        console.log("Sending story to Flask...");

        const response = await fetch("/analyze-story", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                story: story
            })

        });


        console.log("Response status:", response.status);


        const data = await response.json();

        console.log("Response data:", data);


        if (!response.ok) {
            throw new Error(
                data.error || "Server returned an error."
            );
        }


        if (!data.success) {
            throw new Error(
                data.error || "Story analysis failed."
            );
        }


        // -------------------------
        // TITLE
        // -------------------------

        document.getElementById("title").textContent =
            data.project.title;


        // -------------------------
        // CHARACTERS
        // -------------------------

        const characters =
            document.getElementById("characters");

        characters.innerHTML = "";


        data.project.characters.forEach(character => {

            characters.innerHTML += `

                <div class="card">

                    <h3>👤 ${character.name}</h3>

                    <p>
                        <strong>Age:</strong>
                        ${character.age}
                    </p>

                    <p>
                        <strong>Role:</strong>
                        ${character.role}
                    </p>

                    <p>
                        ${character.description}
                    </p>

                </div>

            `;

        });


        // -------------------------
        // SCENES
        // -------------------------

        const scenes =
            document.getElementById("scenes");

        scenes.innerHTML = "";


        data.project.scenes.forEach(scene => {

            scenes.innerHTML += `

                <div class="card">

                    <h3>
                        🎬 Scene ${scene.number}:
                        ${scene.title}
                    </h3>

                    <p>
                        <strong>Location:</strong>
                        ${scene.location}
                    </p>

                    <p>
                        ${scene.description}
                    </p>

                    <p>
                        <strong>🎨 Image Prompt:</strong>
                    </p>

                    <p>
                        ${scene.image_prompt}
                    </p>

                </div>

            `;

        });


        // Show results
        result.style.display = "block";


    } catch (err) {

        console.error("Story analysis error:", err);

        error.textContent =
            "❌ Could not analyze the story: " + err.message;

        error.style.display = "block";

    }

}