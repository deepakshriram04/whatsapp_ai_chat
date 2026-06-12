from flask import Blueprint, request, jsonify

from llm.qwen_loader import ask_llm

chat_bp = Blueprint("chat", __name__)


@chat_bp.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data.get("message", "")

    try:
        bot_response = ask_llm(user_message)

    except Exception as e:
        bot_response = f"Error: {str(e)}"

    return jsonify({
        "response": bot_response
    })