import os
from dotenv import load_dotenv
load_dotenv()
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts import PromptTemplate
from langchain_pinecone import PineconeVectorStore
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import PromptTemplate
from langchain_mistralai import MistralAIEmbeddings,ChatMistralAI
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_classic.chains.retrieval import create_retrieval_chain


llm = ChatMistralAI(model_name="pixtral-12b-2409",api_key=os.environ["MISTRAL_API_KEY"]
)
query = "Nutrient values in Mixed Dishes and Fast Foods"
chain = PromptTemplate.from_template(template=query) | llm
embeddings = MistralAIEmbeddings(model="mistral-embed")
vector_store = PineconeVectorStore(
        index_name=os.environ["INDEX_NAME"],
        embedding=embeddings,
    )
retrieval_qa_chat_prompt = ChatPromptTemplate.from_template("""
You are a helpful assistant.
Use the following context to answer the question.
If you don't know the answer, say you don't know.

Context:
{context}

Question:
{input}

Answer:
""")


combine_documents_chain = create_stuff_documents_chain(llm,retrieval_qa_chat_prompt)
retrival_chain = create_retrieval_chain(
        retriever=vector_store.as_retriever(),
        combine_docs_chain=combine_documents_chain
    )
result = retrival_chain.invoke(input={"input":query})
print(result)









