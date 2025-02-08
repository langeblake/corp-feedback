import { useShallow } from "zustand/shallow";
import { useFeedbackItemsStore } from "../../store/feedbackItemsStore";
import HashTagItem from "./HashTagItem";

export default function HashTagList() {
  // const { companyList, handleSelectCompany } = useFeedbackItemsContext();
  const companyList = useFeedbackItemsStore(useShallow((state) => state.getCompanyList()));
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);

  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashTagItem
          key={company}
          company={company}
          onSelectCompany={selectCompany}
        />
      ))}
    </ul>
  );
}
