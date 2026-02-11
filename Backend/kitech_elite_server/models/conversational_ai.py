import os
import json
from dotenv import load_dotenv

from langchain_core.messages import HumanMessage, AIMessage
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables import RunnableWithMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_groq import ChatGroq



load_dotenv()
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")


store = {}
SESSION_ID = "user1"
HISTORY_FILE = "user1_history.json"



def load_history_from_json(session_id: str, store: dict, filename: str):
    if not os.path.exists(filename):
        return

    with open(filename, "r", encoding="utf-8") as f:
        data = json.load(f)

    history = ChatMessageHistory()

    for item in data:
        if item["sender"] == "user":
            history.add_user_message(item["content"])
        elif item["sender"] == "assistant":
            history.add_ai_message(item["content"])

    store[session_id] = history





def save_history_to_json(session_id: str, store: dict, filename: str):
    history = store.get(session_id)
    if not history:
        return

    history_data = []

    for msg in history.messages:
        if isinstance(msg, HumanMessage):
            sender = "user"
        elif isinstance(msg, AIMessage):
            sender = "assistant"
        else:
            sender = "system"

        history_data.append({
            "sender": sender,
            "content": msg.content
        })

    with open(filename, "w", encoding="utf-8") as f:
        json.dump(history_data, f, indent=4)



def get_session_history(session_id: str) -> ChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]




load_history_from_json(SESSION_ID, store, HISTORY_FILE)


model = ChatGroq(model="llama-3.3-70b-versatile")


prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an excellent AI that gives crisp and clear answers."),
    MessagesPlaceholder(variable_name="messages")
])

chain = prompt | model

with_message_history = RunnableWithMessageHistory(
    chain,
    get_session_history
)

config = {"configurable": {"session_id": SESSION_ID}}


print("Chatbot started. Type 'exit' to quit.\n")

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        break

    response = with_message_history.invoke(
        {"messages": HumanMessage(content=user_input)},
        config=config
    )

    print("Bot:", response.content)

    save_history_to_json(SESSION_ID, store, HISTORY_FILE)

print("Conversation saved. Goodbye!")
