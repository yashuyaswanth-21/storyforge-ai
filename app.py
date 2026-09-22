from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze-story", methods=["POST"])
def analyze_story():

    data = request.get_json()
    story = data.get("story", "").strip()

    if not story:
        return jsonify({
            "success": False,
            "message": "Please enter a story."
        })

    # Temporary story analysis.
    # Later we will replace this with a real AI model.

    project = {
        "title": "My Cinematic Story",

        "characters": [
            {
                "name": "Aarav",
                "age": 21,
                "role": "Main protagonist",
                "description": "A young engineering student."
            },
            {
                "name": "Maya",
                "age": 21,
                "role": "Main female character",
                "description": "A confident and friendly college student."
            }
        ],

        "scenes": [
            {
                "number": 1,
                "title": "First Day",
                "location": "College Campus",
                "description": "Aarav arrives at college on his first day.",
                "image_prompt": "A young Indian engineering student walking through a modern college campus in the morning, cinematic lighting, realistic movie frame."
            },
            {
                "number": 2,
                "title": "First Meeting",
                "location": "College Corridor",
                "description": "Aarav sees Maya for the first time.",
                "image_prompt": "A young Indian engineering student seeing a young Indian woman in a college corridor, subtle eye contact, cinematic romantic lighting, realistic movie frame."
            },
            {
                "number": 3,
                "title": "New Friendship",
                "location": "College Canteen",
                "description": "Aarav and Maya sit together and begin talking.",
                "image_prompt": "Two young Indian college students sitting together in a modern college canteen, talking and smiling, cinematic photography, realistic movie frame."
            },
            {
                "number": 4,
                "title": "Growing Relationship",
                "location": "College Campus",
                "description": "Their friendship slowly develops into love.",
                "image_prompt": "Young Indian college couple walking together across a beautiful campus during golden hour, romantic cinematic lighting, realistic movie frame."
            }
        ]
    }

    return jsonify({
        "success": True,
        "project": project
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )