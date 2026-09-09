"use client";

import React, { useState } from "react";
import { FeedbackHeader } from "@/components/feedback/FeedbackHeader";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { FeedbackSuccess } from "@/components/feedback/FeedbackSuccess";

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[var(--expo-bg)] text-[var(--expo-navy)] antialiased">
      <FeedbackHeader />

      <main className="mx-auto max-w-4xl px-4 pt-8 pb-16 sm:px-6">
        {submitted ? (
          <FeedbackSuccess />
        ) : (
          <FeedbackForm onSubmitted={() => setSubmitted(true)} />
        )}
      </main>
    </div>
  );
}
