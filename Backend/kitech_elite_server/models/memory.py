from langchain_community.chat_message_histories import ChatMessageHistory

SESSION_STORE = {}

def get_session_history(session_id: str):
    if session_id not in SESSION_STORE:
        SESSION_STORE[session_id] = ChatMessageHistory()
    return SESSION_STORE[session_id]
