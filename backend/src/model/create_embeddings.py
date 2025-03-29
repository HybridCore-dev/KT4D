from utils.exception import *
from azure.search.documents.models import VectorizedQuery

def create_prompt_embeddings(prompt, openAI_client, embedding_model_name):

    try:
        prompt_embedding = openAI_client.embeddings.create(input=prompt, model=embedding_model_name).data[0].embedding
        return prompt_embedding
    except:
        raise UnexpectedError(error="Error when sending prompt to embedding model!!!")

def retrieve_related_documents(ai_search_client, prompt_embedding, vector_field_name, 
                               data_source_list, language, doc_count_to_retrieve, k_nearest_neighbors, KNN):
    try:
        if len(data_source_list) == 0:
            raise BadRequestException(error="documentTypes array can't be empty!!!")
        elif len(data_source_list) == 1:
            filter_string = f"dataSourceType eq '{data_source_list[0]}'"
        else:
            filter_string = " or ".join([f"dataSourceType eq '{source}'" for source in data_source_list])
        vector_query=VectorizedQuery(vector=prompt_embedding, k_nearest_neighbors=k_nearest_neighbors, fields=vector_field_name, exhaustive=KNN)
        r = ai_search_client.search(None, top=doc_count_to_retrieve, vector_queries=[vector_query], filter=filter_string)
        return [doc for doc in r]
    except:
        raise UnexpectedError(error="Error when retrieving related documents!!!")



