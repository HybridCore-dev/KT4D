import json
import os
from utils.variables import profile_test_total_question_counts
from utils.variables import profile_informations
from utils.exception import BadRequestException
 
def determine_profile(answers, language="en"):
    def calculate_total_scores(answers): 
        with open('./calculations/questions.json', 'r') as json_file:
            questions = json.load(json_file)   
            x_score, y_score, z_score = 0, 0, 0
            for question_num, answer in answers.items():
                x, y, z = questions[str(question_num)][answer.lower()]
                x_score += x
                y_score += y
                z_score += z
            return x_score, y_score, z_score
    
    def normalize_score(x_score, y_score, z_score):
        x_final_score = x_score / profile_test_total_question_counts["x"]
        y_final_score = y_score / profile_test_total_question_counts["y"]
        z_final_score = z_score / profile_test_total_question_counts["z"]
        return x_final_score, y_final_score, z_final_score

    
    x_score, y_score, z_score = calculate_total_scores(answers)
    x_final_score, y_final_score, z_final_score = normalize_score(x_score, y_score, z_score)
 
    
    for profile_id, data in profile_informations.items():
        point_description = data["point_description"]

        x_check = (x_final_score > 0 and point_description["x"] == "upper") or (x_final_score < 0 and point_description["x"] == "lower")
        y_check = (y_final_score > 0 and point_description["y"] == "upper") or (y_final_score < 0 and point_description["y"] == "lower")
        z_check = (z_final_score > 0 and point_description["z"] == "upper") or (z_final_score < 0 and point_description["z"] == "lower")

        if x_check and y_check and z_check:
            return profile_id
    
    raise BadRequestException(error="User profile couldn't created from given answers!!!")
