from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/create-story", methods=["POST"])
def create_story():
    data = request.get_json()

    story = data.get("story", "").strip()

    if not story:
        return jsonify({
            "success": False,
            "message": "Please enter a story."
        })

    return jsonify({
        "success": True,
        "story": story
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)