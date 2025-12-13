from flask import Flask, request, jsonify
import os
import openai

app = Flask(__name__)

# OpenAI API Key (set this in Railway later)
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/")
def home():
    return "NEUadvert AI is running"

@app.route("/generate-ad", methods=["POST"])
def generate_ad():
    data = request.json
    prompt = data.get("prompt", "Create a marketing idea")

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a professional AI marketing assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    return jsonify({
        "result": response.choices[0].message.content
    })

@app.route("/auto-reply", methods=["POST"])
def auto_reply():
    data = request.json
    message = data.get("message", "A new client inquiry")

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You reply professionally on behalf of NEUadvert."},
            {"role": "user", "content": message}
        ]
    )

    return jsonify({
        "reply": response.choices[0].message.content
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
