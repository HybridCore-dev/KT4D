from model import create_embeddings
from model import chat
from utils.variables import *
from utils.exception import *
from db import database_manager
from openai import AzureOpenAI
from azure.search.documents import SearchClient




def gpt_model(db, session_id, user_id, prompt, data_source_list, language="en"):

    try:    
        openAI_client = AzureOpenAI(
                    api_version=azure_openai_api_version,
                    azure_endpoint=azure_openai_endpoint,
                    api_key=azure_openai_key
        )
    except:
        raise UnexpectedError(error="Azure Open AI Service client create error!!!")
        
    try:
        ai_search_client = SearchClient(endpoint=azure_search_service, 
                                        index_name=azure_search_index, 
                                        credential=credential)
    except:
        raise UnexpectedError(error="Azure AI Search Service client create error!!!")

    prompt_embedding = create_embeddings.create_prompt_embeddings(prompt=prompt, openAI_client=openAI_client, 
                                                                    embedding_model_name=embedding_model_name)
    

    related_documents = create_embeddings.retrieve_related_documents(ai_search_client=ai_search_client, prompt_embedding=prompt_embedding, 
                                                                        vector_field_name=vector_field_name, data_source_list=data_source_list, 
                                                                        language=language, doc_count_to_retrieve=doc_count_to_retrieve,
                                                                        k_nearest_neighbors=k_nearest_neighbors, KNN=KNN)
    database_manager.save_retrieval_list(db_session=db, retrieval_list=[doc["id"] for doc in related_documents], 
                                         session_id=session_id, user_id=user_id)

    profile_distribution = database_manager.get_profile_distribution(db, session_id=session_id)

    gpt_answer = chat.chat(openAI_client=openAI_client, prompt=prompt, docs=related_documents, 
                        language=language, profile_distribution=profile_distribution)

    database_manager.save_gpt_answer(db, answer=gpt_answer, session_id=session_id, user_id=user_id)
    

    return gpt_answer


    

