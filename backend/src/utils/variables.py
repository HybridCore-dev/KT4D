import os
from azure.core.credentials import AzureKeyCredential

# Database
SQLALCHEMY_DATABASE_URL = os.environ.get("POSTGRESQLCONNSTR_SQLALCHEMY_DATABASE_URL")
DATABASE_SCHEMA_NAME = os.environ.get("CUSTOMCONNSTR_DATABASE_SCHEMA_NAME")
 
# Azure Services
azure_search_service = os.environ.get("CUSTOMCONNSTR_azure_search_service")
credential = AzureKeyCredential(os.environ.get("CUSTOMCONNSTR_AzureKeyCredential"))
azure_openai_endpoint = os.environ.get("CUSTOMCONNSTR_azure_openai_endpoint")
azure_openai_key = os.environ.get("CUSTOMCONNSTR_azure_openai_key")
azure_openai_embedding_deployment = os.environ.get("CUSTOMCONNSTR_azure_openai_embedding_deployment")
embedding_model_name = os.environ.get("CUSTOMCONNSTR_embedding_model_name")
azure_openai_api_version = os.environ.get("CUSTOMCONNSTR_azure_openai_api_version")
azure_openai_conversation_model_name =os.environ.get("CUSTOMCONNSTR_azure_openai_conversation_model_name")
azure_search_index = os.environ.get("CUSTOMCONNSTR_azure_search_index")
vector_field_name = os.environ.get("CUSTOMCONNSTR_vector_field_name")
KNN = False
k_nearest_neighbors = 5
doc_count_to_retrieve = 5
gpt_model_token_limit = 8192

# Profiles
profile_test_total_question_counts = {"x": 15, "y": 20, "z": 19}

profile_informations= {
   1 :  {
    "id": 1,
    "title_en": "Market Proponent",
    "description_en": "This profile believes that the free market will naturally adjust to the disruptions caused by AI, creating new opportunities and industries as old ones become obsolete. They argue that government intervention and regulation will only hinder innovation and economic growth.",
    "title_es": "Proponente del mercado",
    "description_es": "Este perfil considera que el libre mercado se ajustará naturalmente a las disrupciones causadas por la IA, creando nuevas oportunidades e industrias a medida que las antiguas se vuelvan obsoletas. Sostienen que la intervención y la regulación del gobierno solo obstaculizarán la innovación y el crecimiento económico.",
    "title_pl": "Zwolennik rynku",
    "description_pl": "Ten profil zakłada, że wolny rynek naturalnie dostosuje się do zakłóceń spowodowanych przez AI, tworząc nowe możliwości i branże, gdy stare staną się przestarzałe. Twierdzą, że interwencja rządu i regulacja będą jedynie utrudniać innowacje i wzrost gospodarczy.",
    "point_description": {"x": "upper", "y": "upper", "z": "upper"}
  },
  2: {
    "id": 2,
    "title_en": "Responsible Innovator",
    "description_en": "This profile emphasises the ethical and societal implications of AI integration into the labour market. They are concerned about issues such as algorithmic bias, privacy, and the impact of AI on human dignity and autonomy. They advocate for responsible development and deployment of AI that prioritises human well-being and social good.",
    "title_es": "Innovador responsable",
    "description_es": "Este perfil pone énfasis en las implicaciones éticas y sociales de la integración de la IA en el mercado laboral. Se preocupan por cuestiones como el sesgo algorítmico, la privacidad y el impacto de la IA en la dignidad y la autonomía humanas. Abogan por un desarrollo y una implementación responsables de la IA que prioricen el bienestar humano y el bien social.",
    "title_pl": "Odpowiedzialny Innowator",
    "description_pl": "Ten profil podkreśla etyczne i społeczne implikacje integracji AI z rynkiem pracy. Martwią się takimi kwestiami jak stronniczość algorytmiczna, prywatność i wpływ AI na godność i autonomię człowieka. Opowiadają się za odpowiedzialnym rozwojem i wdrażaniem AI, które stawia na pierwszym miejscu dobrostan człowieka i dobro społeczne.",
    "point_description": {"x": "upper", "y": "upper", "z": "lower"}
  },
  3: {
    "id": 3,
    "title_en": "Technology Sceptic",
    "description_en": "This profile is deeply sceptical of the potential benefits of AI and sees it as a threat to human employment and job security. They fear that AI will automate a significant portion of jobs, leading to widespread unemployment and social unrest.",
    "title_es": "Escéptico tecnológico",
    "description_es": "Este perfil es profundamente escéptico respecto de los posibles beneficios de la IA y la considera una amenaza para el empleo humano y la seguridad laboral. Temen que la IA automatice una parte importante de los empleos, lo que provocará un desempleo generalizado y malestar social.",
    "title_pl": "Sceptyk technologii",
    "description_pl": "Ten profil jest głęboko sceptyczny co do potencjalnych korzyści AI i postrzega ją jako zagrożenie dla zatrudnienia ludzi i bezpieczeństwa pracy. Obawiają się, że AI zautomatyzuje znaczną część miejsc pracy, co doprowadzi do powszechnego bezrobocia i niepokojów społecznych.",
    "point_description": {"x": "lower", "y": "upper", "z": "lower"}
  },
  4: {
    "id": 4,
    "title_en": "Balanced Regulator",
    "description_en": "This profile recognizes the potential benefits and risks of AI in the labour market and advocates for a balanced approach that involves careful regulation and governance frameworks. They believe that proactive policies and collaboration between governments, industry, and stakeholders are necessary to navigate the challenges and opportunities posed by AI.",
    "title_es": "Regulador equilibrado",
    "description_es": "Este perfil reconoce los posibles beneficios y riesgos de la IA en el mercado laboral y aboga por un enfoque equilibrado que implique marcos de regulación y gobernanza cuidadosos. Creen que las políticas proactivas y la colaboración entre los gobiernos, la industria y las partes interesadas son necesarias para afrontar los desafíos y las oportunidades que plantea la IA.",
    "title_pl": "Zrównoważony regulator",
    "description_pl": "Ten profil rozpoznaje potencjalne korzyści i zagrożenia związane ze sztuczną inteligencją na rynku pracy i opowiada się za zrównoważonym podejściem, które obejmuje ostrożne ramy regulacyjne i zarządzania. Uważają, że proaktywna polityka i współpraca między rządami, przemysłem i interesariuszami są niezbędne do radzenia sobie z wyzwaniami i szansami stawianymi przez sztuczną inteligencję.",
    "point_description": {"x": "lower", "y": "upper", "z": "upper"}
  },
  5: {
    "id": 5,
    "title_en": "Technology Enthusiast",
    "description_en": "This profile believes that AI will ultimately create more jobs than it displaces, leading to economic growth and improved living standards. They view AI as a tool that will augment and complement human workers, freeing them from routine tasks and enabling them to focus on more creative and fulfilling work.",
    "title_es": "Entusiasta de la tecnología",
    "description_es": "Este perfil cree que la IA creará más puestos de trabajo de los que sustituya, lo que conducirá al crecimiento económico y a una mejora de los niveles de vida. Consideran que la IA es una herramienta que aumentará y complementará a los trabajadores humanos, liberándolos de las tareas rutinarias y permitiéndoles centrarse en un trabajo más creativo y gratificante.",
    "title_pl": "Miłośnik technologii",
    "description_pl": "Ten profil uważa, że AI ostatecznie stworzy więcej miejsc pracy, niż zastąpi, co doprowadzi do wzrostu gospodarczego i poprawy standardów życia. AI postrzegana jest jako narzędzie, które będzie uzupełniać i wzmacniać ludzkich pracowników, uwalniając ich od rutynowych zadań i umożliwiając im skupienie się na bardziej kreatywnej i satysfakcjonującej pracy.",
    "point_description": {"x": "upper", "y": "lower", "z": "upper"}
  },
  6: {
    "id": 6,
    "title_en": "Social Impact Advocate",
    "description_en": "This profile is deeply concerned about the potential effects of AI on specific demographic groups, particularly low-skilled workers, minorities, and older workers. They argue that these groups are disproportionately vulnerable to job displacement and may face significant challenges in adapting to the changing labour market.",
    "title_es": "Defensor del impacto social",
    "description_es": "Este perfil se preocupa profundamente por los posibles efectos de la IA en grupos demográficos específicos, en particular los trabajadores poco cualificados, las minorías y los trabajadores de mayor edad. Sostienen que estos grupos son desproporcionadamente vulnerables a la pérdida de empleo y pueden enfrentarse a importantes desafíos para adaptarse al cambiante mercado laboral.",
    "title_pl": "Rzecznik wpływu społecznego",
    "description_pl": "Ten profil jest głęboko zaniepokojony potencjalnymi skutkami AI dla określonych grup demograficznych, w szczególności pracowników o niskich kwalifikacjach, mniejszości i starszych pracowników. Twierdzą, że te grupy są nieproporcjonalnie narażone na utratę pracy i mogą napotkać znaczne wyzwania w dostosowaniu się do zmieniającego się rynku pracy.",
    "point_description": {"x": "upper", "y": "lower", "z": "lower"}
  },
  7: {
    "id": 7,
    "title_en": "System Critic",
    "description_en": "This profile is highly critical of the capitalist system and views AI as a tool for further concentration of wealth and power in the hands of a few corporations and elites. They advocate for a more equitable distribution of the benefits of AI and challenge the notion of technological progress at the expense of workers.",
    "title_es": "Crítico del sistema",
    "description_es": "Este perfil es muy crítico con el sistema capitalista y considera la IA como una herramienta para una mayor concentración de riqueza y poder en manos de unas pocas corporaciones y élites. Aboga por una distribución más equitativa de los beneficios de la IA y cuestiona la noción de progreso tecnológico a expensas de los trabajadores.",
    "title_pl": "Krytyk systemu",
    "description_pl": "Ten profil jest bardzo krytyczny wobec systemu kapitalistycznego i postrzega AI jako narzędzie do dalszej koncentracji bogactwa i władzy w rękach kilku korporacji i elit. Opowiadają się za bardziej sprawiedliwym podziałem korzyści płynących z AI i kwestionują ideę postępu technologicznego kosztem pracowników.",
    "point_description": {"x": "lower", "y": "lower", "z": "lower"}
  },
  8: {
    "id": 8,
    "title_en": "Worker Advocate",
    "description_en": "This profile represents the interests of workers and labour unions, advocating for policies and regulations that protect workers' rights and ensure a fair transition to an AI-powered economy. They are concerned about the potential for job displacement and erosion of wages and working conditions.",
    "title_es": "Defensor del trabajador",
    "description_es": "Este perfil representa los intereses de los trabajadores y los sindicatos, y aboga por políticas y regulaciones que protejan los derechos de los trabajadores y garanticen una transición justa hacia una economía impulsada por la IA. Les preocupa la posibilidad de que se produzcan desplazamientos laborales y la erosión de los salarios y las condiciones de trabajo.",
    "title_pl": "Rzecznik Praw Pracowników",
    "description_pl": "Ten profil reprezentuje interesy pracowników i związków zawodowych, opowiadając się za politykami i regulacjami, które chronią prawa pracowników i zapewniają sprawiedliwe przejście do gospodarki opartej na sztucznej inteligencji. Martwią się o potencjalne przemieszczenia miejsc pracy i erozję płac i warunków pracy.",
    "point_description": {"x": "lower", "y": "lower", "z": "upper"}
    }
}

# Supported Languages
language_dict = {"en": "English", "es": "Español", "pl": "polski"}

# Session Phases
session_phases = ['started', 'prompting', 'completed']

# Scheduler
SCHEDULER_INTERVAL = 15 # minutes
AUTO_SESSION_COMPLETE_HOURS = 8 # hours