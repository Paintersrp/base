from .models import *
from collections import defaultdict
from typing import Dict


def analyze_questionnaire_results(results) -> Dict[str, Dict[str, int]]:
    """
    Analyze the results of a particular questionnaire and return a dictionary with statistics for each question and answer choice.

    Args:
        results: QuerySet of QuestionnaireResult objects to analyze.

    Returns:
        A dictionary with statistics for each question and answer choice.
    """
    stats = defaultdict(lambda: defaultdict(int))

    for result in results:
        answers = QuestionnaireResultAnswer.objects.filter(questionnaire_result=result)

        for answer in answers:
            question = answer.question
            answer_choice = answer.answer_choice

            stats[question.text][answer_choice.text] += 1
            stats[question.text]["total"] += 1

    stats_dict = dict(stats)

    for question, answer_stats in stats_dict.items():
        total_answers = answer_stats.pop("total")
        for answer_choice, count in answer_stats.items():
            percentage = round(count / total_answers * 100)
            answer_stats[answer_choice] = {
                "count": count,
                "percent": percentage,
            }

    return stats_dict
