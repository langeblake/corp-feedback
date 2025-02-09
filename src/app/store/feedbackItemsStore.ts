/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { TFeedbackItem } from "../libs/types";

type Store = {
  feedbackItems: TFeedbackItem[];
  loading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
  upvoteFeedbackItem: (id: string) => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  loading: false,
  errorMessage: "",
  selectedCompany: "",

  hasUpvoted: (feedbackId: number) => {
    const upvotedItems = JSON.parse(
      localStorage.getItem("upvotedItems") || "[]"
    );
    return upvotedItems.includes(feedbackId);
  },

  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  },

  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === state.selectedCompany
        )
      : state.feedbackItems;
  },

  addItemToList: async (text: string) => {
    try {
      const companyName = text
        .split(" ")
        .find((word) => word.includes("#"))
        ?.substring(1);
      if (!companyName) {
        throw new Error("Company name not found in text.");
      }

      const newItem: Omit<TFeedbackItem, "id" | "daysAgo"> = {
        text,
        upvoteCount: 0,
        company: companyName,
        badgeLetter: companyName.substring(0, 1).toUpperCase(),
      };

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add feedback");
      }

      const savedItem = await response.json();
      set((prev) => ({ feedbackItems: [...prev.feedbackItems, savedItem] }));
    } catch (error) {
      set(() => ({ errorMessage: "Failed to add feedback. Try again." }));
    }
  },

  selectCompany: (company: string) => {
    set(() => ({ selectedCompany: company }));
  },

  fetchFeedbackItems: async () => {
    set(() => ({ loading: true, errorMessage: "" }));

    try {
      const response = await fetch("/api/feedback");
      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }

      const data = await response.json();
      set(() => ({ feedbackItems: data }));
    } catch (error) {
      set(() => ({ errorMessage: "Something went wrong." }));
    } finally {
      set(() => ({ loading: false }));
    }
  },

  upvoteFeedbackItem: async (id: string) => {
    try {
      const response = await fetch("/api/feedback", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to upvote feedback");
      }

      const upvotedItems = JSON.parse(
        localStorage.getItem("upvotedItems") || "[]"
      );
      localStorage.setItem(
        "upvotedItems",
        JSON.stringify([...upvotedItems, id])
      );

      set((state) => ({
        feedbackItems: state.feedbackItems.map((item) =>
          item.id.toString() === id
            ? { ...item, upvoteCount: item.upvoteCount + 1 }
            : item
        ),
      }));
    } catch (error) {
      set(() => ({ errorMessage: "Failed to upvote feedback. Try again." }));
    }
  },
}));
