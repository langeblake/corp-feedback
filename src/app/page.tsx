'use client';

import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import HashTagList from "./components/hashtag/HashTagList";
import { useEffect } from "react";
import { useFeedbackItemsStore } from "./store/feedbackItemsStore";

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore((state) => state.fetchFeedbackItems);

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <div className="app">
      <Footer />

      <Container />
      <HashTagList />
    </div>
  );
}

export default App;
