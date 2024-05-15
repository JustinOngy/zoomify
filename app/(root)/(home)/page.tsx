"use client";
import MeetingTypeList from "@/components/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";
import React from "react";

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );
  const { upcomingCalls } = useGetCalls();
  const numberOfUpcomingCalls = upcomingCalls.length;

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero-img bg-cover">
        <div className="flex h-full  justify-between   ">
          <div className="flex flex-col gap-2 md:p-7 lg:p-11 sm:p-7 p-7">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
          <div className="glassmorphism lg:w-[300px] md:w-[200px] sm:w-[100px] h-full rounded py-2 text-center text-base font-normal flex flex-col items-center justify-center ">
            <h2 className="text-4xl font-extrabold lg:text-5xl mb-3 ">
              {numberOfUpcomingCalls}
            </h2>
            <h2 className="text-lg font-medium text-sky-1 lg:text-2xl">
              Upcoming Meetings
            </h2>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
