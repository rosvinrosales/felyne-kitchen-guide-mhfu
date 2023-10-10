import React from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FoodsProps,
  convertFoodsToArray,
  capitalizeEveryWord,
} from "@/lib/utils";

type FoodSelectProps = {
  currentFoods: FoodsProps | undefined;
  onSelectFood: (value: string) => void;
  setCurrentFoodsArray: React.Dispatch<React.SetStateAction<string[]>>;
  currentFoodsArray: string[];
};

export const FoodSelect = ({
  currentFoods,
  onSelectFood,
  setCurrentFoodsArray,
  currentFoodsArray,
}: FoodSelectProps) => {
  const resultArray = currentFoods ? convertFoodsToArray(currentFoods) : [];

  React.useEffect(() => {
    setCurrentFoodsArray(resultArray);
  }, [currentFoods?.Bran]);

  const handleOnSelectFood = (value: string) => {
    onSelectFood(value);
    const tempArray = currentFoodsArray.filter(
      (food) => food.toUpperCase() !== value.toLocaleUpperCase()
    );
    setCurrentFoodsArray(tempArray);
  };

  return (
    <div className="rounded-lg border p-2">
      <Command>
        <CommandInput placeholder="Search food..." />
        <CommandList className="max-h-[150px]">
          <CommandEmpty>No results found.</CommandEmpty>
          {currentFoodsArray.length > 0 ? (
            currentFoodsArray.map((food, index) => (
              <CommandItem key={index} onSelect={handleOnSelectFood}>
                {capitalizeEveryWord(food)}
              </CommandItem>
            ))
          ) : (
            <CommandItem>Empty</CommandItem>
          )}
        </CommandList>
      </Command>
    </div>
  );
};
