import React from "react";

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7 text-gray-700 dark:text-gray-300">
            About Curious Canvas
          </h1>
          <div className="text-gray-700 dark:text-gray-300 flex flex-col gap-6">
            <p>
              "Curious Canvas" delves into the ever-evolving world of technology
              with its dedicated category, offering a rich tapestry of articles,
              insights, and discussions that explore the latest trends,
              innovations, and breakthroughs shaping the digital landscape.
            </p>
            <p>
              From in-depth analyses of emerging technologies such as artificial
              intelligence and blockchain to practical guides on software
              development, cybersecurity, and digital ethics, the Tech category
              serves as a beacon for tech enthusiasts, professionals, and
              curious minds alike.
            </p>
            <p>
              Whether uncovering the implications of new gadgets, examining the
              intersection of technology and society, or celebrating the
              ingenuity of tech pioneers, "Curious Canvas" aims to inform,
              inspire, and spark meaningful conversations that propel us forward
              in the digital age.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
