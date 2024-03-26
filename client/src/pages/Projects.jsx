import React from "react";
import CallToAction from "../components/CallToAction"

export default function Projects() {
  return (
    <div className="min-h-screen max-w-3xl text-center mx-auto p-3">
      <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 my-5">Projects</h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg my-3">
        Build fun and engaging projects while learning HTML, CSS and Javascript!
      </p>
      <CallToAction/>
    </div>
  );
}
