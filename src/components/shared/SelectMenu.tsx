import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IProps {
  label: string;
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}

const SelectMenu = ({ label, options = [], selected, setSelected }: IProps) => {
  return (
    <Select value={selected} onValueChange={setSelected}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`${label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option} value={option} onClick={() => setSelected(option)} className="cursor-pointer">
              {option[0].toUpperCase() + option.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectMenu;
