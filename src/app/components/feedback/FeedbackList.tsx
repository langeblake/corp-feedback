import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsStore } from "../../store/feedbackItemsStore";
import { useShallow } from "zustand/shallow";

export default function FeedbackList() {
  const loading = useFeedbackItemsStore((state) => state.loading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);
  const filteredFeedbackItems = useFeedbackItemsStore(useShallow((state) =>
    state.getFilteredFeedbackItems()
  ));

  const sortedFeedbackItems = [...filteredFeedbackItems].sort(
    (a, b) => b.upvoteCount - a.upvoteCount
  );

  return (
    <ol className="feedback-list">
      {loading && <Spinner />}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {sortedFeedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
