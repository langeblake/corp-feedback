import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";
import { TFeedbackItem } from "./types";

export function useFeedbackItemsContext() {
    const context = useContext(FeedbackItemsContext);
    if (!context) {
      throw new Error(
        "FeedbackItemsContext is not defined in useFeedbackItemsContext hook"
      );
    }
    return context;
  }
  

export function useFeedbackItems() {
    const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        setLoading(true);
        const fetchFeedbackItems = async () => {
          try {
            const response = await fetch(
              "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
            );
            if (!response.ok) {
              throw new Error();
            }
            const data = await response.json();
            setFeedbackItems(data.feedbacks);
          } catch (error) {
            setErrorMessage("Something went wrong.");
          }
          setLoading(false);
        };
    
        fetchFeedbackItems();
      }, []);

      return { feedbackItems, setFeedbackItems, loading, errorMessage };
}