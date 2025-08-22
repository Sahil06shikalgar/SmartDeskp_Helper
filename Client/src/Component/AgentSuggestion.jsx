import React from "react";

const AgentSuggestion = ({ suggestion }) => {
  if (!suggestion) return null;

  const { predictedCategory, draftReply, citations, confidence } = suggestion;

  return (
    <div className="bg-yellow-50 border border-yellow-300 p-4 rounded mt-4">
      <h3 className="font-semibold text-yellow-700">AI Suggested Reply</h3>
      <p className="text-sm mt-2 whitespace-pre-line">{draftReply}</p>
      <div className="text-xs text-gray-500 mt-2">
        <p>Category: <strong>{predictedCategory}</strong></p>
        <p>Confidence: {(confidence * 100).toFixed(1)}%</p>
        <p>Citations: {citations?.join(", ") || "None"}</p>
      </div>
    </div>
  );
};

export default AgentSuggestion;
