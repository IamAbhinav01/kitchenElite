from dotenv import load_dotenv
import os
load_dotenv()
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_mistralai import MistralAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone

loader = PyPDFLoader(r'E:\kitchenELITE\Backend\models\NutritiveValueofFoods.pdf')
document = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
texts = text_splitter.split_documents(document)
embeddings = MistralAIEmbeddings(model="mistral-embed")
pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])

PineconeVectorStore.from_documents(
        texts,embedding=embeddings,
        index_name = os.environ["INDEX_NAME"]
    )
