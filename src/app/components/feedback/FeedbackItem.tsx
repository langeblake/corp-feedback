import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItem } from "../../libs/types";
import { useState, useEffect } from "react";
import { useFeedbackItemsStore } from "../../store/feedbackItemsStore";

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const upvoteFeedbackItem = useFeedbackItemsStore((state) => state.upvoteFeedbackItem);

  // 🔹 Check `localStorage` to see if this item has been upvoted
  useEffect(() => {
    const upvotedItems = JSON.parse(localStorage.getItem("upvotedItems") || "[]");
    setHasUpvoted(upvotedItems.includes(feedbackItem.id.toString()));
  }, [feedbackItem.id]);

  const handleUpvote = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.disabled = true; // Disable button immediately
    e.stopPropagation();

    if (hasUpvoted) return; // Prevent extra requests

    setUpvoteCount((prev) => prev + 1);

    await upvoteFeedbackItem(feedbackItem.id.toString());

    // 🔹 Update `localStorage` with the new upvote
    const upvotedItems = JSON.parse(localStorage.getItem("upvotedItems") || "[]");
    localStorage.setItem("upvotedItems", JSON.stringify([...upvotedItems, feedbackItem.id.toString()]));

    setHasUpvoted(true); // Update local state
  };

  return (
    <li
      onClick={() => setOpen((prev) => !prev)}
      className={`feedback ${open && "feedback--expand"}`}
    >
      <button onClick={handleUpvote} disabled={hasUpvoted} className={hasUpvoted ? "disabled-button" : ""}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>
      <p>{feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}
