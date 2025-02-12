import Link from "next/link";
import { FaComments } from "react-icons/fa";


export default function Logo() {
  return <Link href="/" className="text-white font-bold flex items-center gap-2 z-20 mt-3"><FaComments size={20}/><p>CorpFeedback</p></Link>;
}
