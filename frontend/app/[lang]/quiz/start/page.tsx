"use client";

import Container from "@/components/platform/container";
import FullscreenLoading from "@/components/platform/fullscreen-loading";
import VideoBG from "@/components/platform/video-bg";

import { CalendarDaysIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "@/components/platform/button";
import clsx from "clsx";
import useDictionary from "@/hooks/useDictionary";
import useLogic from "./logic";
import useToggle from "@/hooks/useToggle";
import CreateSession from "./components/create";
import moment from "moment";
import JoinSession from "./components/join";

export default function Page() {
  const { state, action } = useLogic();
  const { dictionary } = useDictionary();
  const createToggle = useToggle(false);
  const joinToggle = useToggle(false);

  return (
    <>
      {state.fetchLoading && <FullscreenLoading />}
      <Container className="max-w-3xl text-center my-8">
        <h3 className="mb-8">{dictionary.quiz.start.title}</h3>
        <p className="mb-20">{dictionary.quiz.start.text}</p>

        <div className="flex justify-between items-center my-8">
          <h5>Join a Session</h5>
          <Button
            variant="text"
            color="secondary"
            icon={<PlusIcon className="w-4 h-4" />}
            onClick={createToggle.action.open}
          >
            Create
          </Button>
        </div>

        {state.sessions.length > 0 &&
          state.sessions.map((item) => (
            <Button
              key={item.id}
              variant="outlined"
              color="white"
              size="large"
              className="block w-full mb-3"
              onClick={() => {
                action.setSelectedSessionId(item.id);
                joinToggle.action.open();
              }}
            >
              <div className="flex items-center justify-start w-full">
                <span
                  className={clsx("rounded-full w-4 h-4  mr-4", {
                    "bg-[#4BB543]": item.active,
                    "bg-[#ff3333]": !item.active,
                  })}
                ></span>
                <div className="flex-grow flex flex-col md:flex-row md:justify-between">
                  <span className="text-left text-lg">
                    #{item.id} - {item.name}
                  </span>
                  <span className="flex items-center text-text-light">
                    <CalendarDaysIcon className="w-4 h-4 mr-1" />
                    {moment(item.createDate).format("LLL")}
                  </span>
                </div>
              </div>
            </Button>
          ))}

        {!state.fetchLoading && state.sessions.length === 0 && (
          <div className="text-center border border-border-light px-2 py-3 rounded-full">
            No session found!
          </div>
        )}

        {/* <div className="block md:flex justify-center mb-20">
          <label
            className="flex flex-col justify-center items-center border border-white/50 rounded-2xl w-[200px] h-[150px] group transition-all hover:border-white/75 hover:bg-white/10 relative has-[:checked]:border-secondary cursor-pointer mb-6 mx-auto md:mx-4"
            onClick={createSession}
          >
            <PlusIcon className="w-10 h-10 mb-3" />
            <span>{dictionary.quiz.start.createSession}</span>
          </label>
          <label
            className="flex flex-col justify-center items-center border border-white/50 rounded-2xl w-[200px] h-[150px] group transition-all hover:border-white/75 hover:bg-white/10 relative has-[:checked]:border-secondary cursor-pointer mb-6 mx-auto md:mx-4"
            onClick={joinSession}
          >
            <ArrowRightEndOnRectangleIcon className="w-10 h-10 mb-3" />
            <span>{dictionary.quiz.start.joinSession}</span>
          </label>
        </div> */}
      </Container>

      <CreateSession
        open={createToggle.state.isOpen}
        loading={state.createLoading}
        onCancel={createToggle.action.close}
        onSubmit={action.createSession}
      />

      <JoinSession
        open={joinToggle.state.isOpen}
        loading={state.joinLoading}
        onCancel={joinToggle.action.close}
        onSubmit={action.joinSession}
      />

      <VideoBG />
    </>
  );
}
