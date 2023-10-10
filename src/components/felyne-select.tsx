import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FelyneSelectProps {
  onSelectFelyne: (value: string) => void;
}

export const FelyneSelect = ({ onSelectFelyne }: FelyneSelectProps) => {
  return (
    <div className=" [&>button]:w-full">
      <Select onValueChange={onSelectFelyne}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Felyne Number" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 5 }, (_, index) => (
            <SelectItem value={(index + 1).toString()} key={index}>
              {index + 1} Felyne
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
