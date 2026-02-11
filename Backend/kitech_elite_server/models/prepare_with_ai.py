import os
import json
from dotenv import load_dotenv

from langchain_core.messages import HumanMessage, AIMessage
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnableWithMessageHistory
from langchain_groq import ChatGroq



load_dotenv()
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")

model = ChatGroq(model="llama-3.3-70b-versatile")


store = {}

def get_session_history(session_id: str) -> ChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]


# ----------------- SAVE / LOAD HISTORY -----------------

def load_history(session_id):
    filename = f"{session_id}.json"
    if not os.path.exists(filename):
        return

    with open(filename, "r", encoding="utf-8") as f:
        data = json.load(f)

    history = ChatMessageHistory()

    for msg in data:
        if msg["sender"] == "user":
            history.add_user_message(msg["content"])
        else:
            history.add_ai_message(msg["content"])

    store[session_id] = history


def save_history(session_id):
    history = store.get(session_id)
    if not history:
        return

    data = []

    for msg in history.messages:
        sender = "user" if isinstance(msg, HumanMessage) else "assistant"
        data.append({
            "sender": sender,
            "content": msg.content
        })

    with open(f"{session_id}.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)


# ----------------- RECIPE PROMPT -----------------

recipe_prompt = ChatPromptTemplate.from_messages([
(
"system",
"You are PrepareWithAI Recipe Generator.\n"
"User gives ingredients or food idea.\n"
"You must return ONLY valid JSON.\n"
"Do NOT add explanations, markdown, or extra text.\n"
"\n"
"JSON Schema:\n"
"{{\n"
" \"recipe_name\": \"string\",\n"
" \"ingredients\": [\"string\"],\n"
" \"steps\": [\n"
"   {{\n"
"     \"step_number\": number,\n"
"     \"instruction\": \"string\",\n"
"     \"time\": \"string\",\n"
"     \"tip\": \"string\"\n"
"   }}\n"
" ]\n"
"}}"
),
("human", "{input}")
])


def generate_recipe(user_input: str):
    chain = recipe_prompt | model
    result = chain.invoke({"input": user_input})

    try:
        return json.loads(result.content)
    except:
        return {
            "error": "Model did not return valid JSON",
            "raw_output": result.content
        }


# ----------------- GUIDE PROMPT -----------------

guide_prompt = ChatPromptTemplate.from_messages([
(
"system",
"You are PrepareWithAI Cooking Guide.\n"
"You help users while they cook step by step.\n"
"You remember all previous messages.\n"
"You answer simply and clearly.\n"
"You do NOT regenerate the full recipe.\n"
),
MessagesPlaceholder(variable_name="messages")
])

guide_chain = guide_prompt | model

guide_with_memory = RunnableWithMessageHistory(
    guide_chain,
    get_session_history
)

def guide_chat(session_id: str, message: str):
    response = guide_with_memory.invoke(
        {"messages": HumanMessage(content=message)},
        {"configurable": {"session_id": session_id}}
    )

    save_history(session_id)
    return response.content


# ----------------- MAIN PROGRAM -----------------

if __name__ == "__main__":

    SESSION_ID = "user1"
    load_history(SESSION_ID)

    print("\n=== PrepareWithAI ===\n")

    idea = input("What do you want to cook? ")

    recipe = generate_recipe(idea)

    print("\n--- GENERATED RECIPE ---\n")
    print(json.dumps(recipe, indent=2))

    # 🔥 STORE RECIPE INTO MEMORY
    history = get_session_history(SESSION_ID)
    history.add_ai_message(
        f"Here is the recipe JSON:\n{json.dumps(recipe, indent=2)}"
    )
    save_history(SESSION_ID)

    print("\n--- COOKING GUIDE CHAT ---")
    print("Ask doubts (type exit to quit)\n")

    while True:
        q = input("You: ")

        if q.lower() == "exit":
            break

        reply = guide_chat(SESSION_ID, q)
        print("AI:", reply)

    print("\nConversation saved. Goodbye!")
