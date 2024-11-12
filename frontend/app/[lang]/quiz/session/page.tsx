"use client";

import { useEffect, useMemo, useState } from "react";

import { RadioGroup } from "@headlessui/react";
import Button from "@/components/platform/button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import VideoBG from "@/components/platform/video-bg";
import { AnswerLetterType, Question, TestResults } from "@/actions/quiz/typing";
import QuizActions from "@/actions/quiz";
import Store from "@/store";
import FullscreenLoading from "@/components/platform/fullscreen-loading";
import { alert } from "@/components/platform/confirm";
import useDictionary from "@/hooks/useDictionary";
import UserActions from "@/actions/user";
import { UserStatus } from "@/actions/user/typing";

export default function Page() {
  const router = useRouter();
  const { locale, dictionary } = useDictionary();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, AnswerLetterType>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);

  const current = useMemo(
    () => questions[currentIndex],
    [questions, currentIndex]
  );

  useEffect(() => {
    const timer = setTimeout(fetchData, 50);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const fetchData = async () => {
    const session = Store.session.get();
    if (session) {
      const questions = await QuizActions.getQuestions(locale);
      setQuestions(questions);
      const response = await UserActions.getStatus(
        session.userId,
        session.sessionId
      );
      if (response.success) {
        const { data: status } = response;
        Store.session.setUserStatus(status);
        if (status.current === "QUIZ_INPROGRESS") {
          if (status.history.length > 0) {
            const history = status.history.find(
              (item) => item.step === "QUIZ_INPROGRESS"
            );
            if (history) {
              const answers: Map<number, AnswerLetterType> = new Map<
                number,
                AnswerLetterType
              >(
                Object.entries(history.details as TestResults).map((item) => [
                  Number(item[0]),
                  item[1],
                ])
              );
              if (answers.size > 0) {
                setAnswers(answers);
                setCurrentIndex(answers.size - 1);
              }
            }
          }
        } else console.log("Current user status is wrong!");
      }
    } else alert("Error!", "Session not found!");
    setLoading(false);
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex((current) => current - 1);
  };

  const next = () => {
    if (currentIndex < questions.length - 1)
      setCurrentIndex((current) => current + 1);
  };

  const finish = async () => {
    const session = Store.session.get();
    if (session) {
      setLoading(true);
      const testResults: TestResults = Object.fromEntries(answers.entries());
      const response = await QuizActions.saveResults(locale, {
        ...session,
        testResults,
      });
      if (response.success) {
        Store.session.setProfileId(response.data.groupType);

        const currentStatus = Store.session.getUserStatus();
        const newStatus: UserStatus = {
          current: "QUIZ_COMPLETED",
          next:
            Store.session.getUserRole() === "MODERATOR"
              ? "WAITING_OTHER_USERS"
              : "PLATFORM_STRUCTURE_INFO",
          history: currentStatus ? currentStatus.history : [],
        };
        const saveStatusResponse = await UserActions.saveStatus(
          session.userId,
          session.sessionId,
          newStatus
        );
        if (saveStatusResponse.success) {
          Store.session.setUserStatus(newStatus);
          router.push(`/${locale}/quiz/results`);
        } else
          alert(
            "Error!",
            "An error occurred while saving the user status.\n" +
              JSON.stringify(saveStatusResponse.error)
          );
      } else console.log("Results could not be saved!");
      setLoading(false);
    } else alert("Error!", "Session not found!");
  };

  const handleAnswerChange = (value: AnswerLetterType) => {
    const newAnswers = new Map(answers);
    newAnswers.set(current.id, value);
    setAnswers(newAnswers);

    const session = Store.session.get();
    if (session) {
      const currentStatus = Store.session.getUserStatus();
      const historyDetails: TestResults = Object.fromEntries(
        newAnswers.entries()
      );
      const newStatus: UserStatus = currentStatus
        ? {
            ...currentStatus,
            history: [
              ...currentStatus.history.filter(
                (item) => item.step !== "QUIZ_INPROGRESS"
              ),
              {
                step: "QUIZ_INPROGRESS",
                details: historyDetails,
              },
            ],
          }
        : {
            current: "QUIZ_INPROGRESS",
            next: "QUIZ_INPROGRESS",
            history: [
              {
                step: "QUIZ_INPROGRESS",
                details: historyDetails,
              },
            ],
          };

      UserActions.saveStatus(session.userId, session.sessionId, newStatus);
    }
  };

  if (!current) return <></>;

  return (
    <>
      {loading && <FullscreenLoading />}
      <div className="max-w-3xl px-6 mx-auto my-8 text-center">
        <span className="block text-lg font-bold text-secondary-light mb-4">
          {dictionary.quiz.session.question} {currentIndex + 1}/
          {questions.length}
        </span>
        <h4 className="font-semibold mb-12">{current.text}</h4>

        <RadioGroup
          value={answers.get(current.id) ?? ""}
          onChange={handleAnswerChange}
          className="mb-12"
        >
          {current.answers.map((answer, index) => (
            <RadioGroup.Option
              key={index}
              value={answer.letter}
              className={({ checked }) =>
                `block text-sm md:text-lg text-white px-2 py-3 rounded-full border mb-4 cursor-pointer transition-all ${
                  checked
                    ? "border-transparent bg-primary"
                    : "border-white hover:border-[#3c5b87] hover:shadow-[0_0_20px_0px_rgba(100,196,255,0.5)]"
                }`
              }
            >
              {answer.text}
            </RadioGroup.Option>
          ))}
        </RadioGroup>

        <div className="flex justify-between items-center">
          <Button
            variant="text"
            color="white"
            className="mt-4 hover:text-white"
            disabled={currentIndex === 0}
            onClick={prev}
          >
            <ArrowLeftIcon className="w-5 h-5 me-2" /> {dictionary.shared.prev}
          </Button>

          {currentIndex === questions.length - 1 ? (
            <Button
              icon={<CheckIcon className="w-5 h-5" />}
              disabled={!answers.get(current.id)}
              onClick={finish}
            >
              {dictionary.shared.finish}
            </Button>
          ) : (
            <Button
              icon={<ArrowRightIcon className="w-5 h-5" />}
              disabled={!answers.get(current.id)}
              onClick={next}
            >
              {dictionary.shared.nextQuestion}
            </Button>
          )}
        </div>
      </div>
      <VideoBG />
    </>
  );
}
