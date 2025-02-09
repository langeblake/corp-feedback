import { IoMdRefresh } from "react-icons/io";
import { useFeedbackItemsStore } from "../../store/feedbackItemsStore";
import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

export default function Header() {
  const addItemToList = useFeedbackItemsStore((state) => state.addItemToList);
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={addItemToList} />
      <IoMdRefresh color="white" size={20} className="flex ml-auto mr-6 mb-2 hover:cursor-pointer" onClick={() => selectCompany("")}/>
    </header>
  );
}
