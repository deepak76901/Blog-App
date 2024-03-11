import React from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams();
  return (
    <div className="min-h-screen">
      <p className="text-xl font-semibold">{id}</p>
    </div>
  );
}
