interface HashTagItemProps {
  company: string;
  onSelectCompany: (company: string) => void;
}

export default function HashTagItem({ company, onSelectCompany }: HashTagItemProps) {
  return (
    <li>
      <button onClick={() => onSelectCompany(company)}>#{company}</button>
    </li>
  );
}
