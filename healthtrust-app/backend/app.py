from flask import Flask, request, jsonify
from flask_cors import CORS
from googletrans import Translator

app = Flask(__name__)
CORS(app)

chat_history = []
translator = Translator()

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_msg = data.get("message")
    ai_response = f"AI Response: Based on WHO data, '{user_msg}' is not accurate. Staying hydrated helps but does not cure COVID."
    chat_history.append({"user": user_msg, "ai": ai_response})
    return jsonify({"response": ai_response})

@app.route("/api/history", methods=["GET"])
def history():
    return jsonify(chat_history)

# ✅ Translation endpoint
@app.route("/api/translate", methods=["POST"])
def translate():
    data = request.json
    text = data.get("text")
    target_lang = data.get("lang", "hi")  # default Hindi
    translated = translator.translate(text, dest=target_lang)
    return jsonify({"translated_text": translated.text})

if __name__ == "__main__":
    app.run(debug=True)
