import { CardHeader } from "@/components/ui/card";
import { getFoodEffects } from "@/lib/utils";

type FoodResultProps = {
  selectedFoods: string[];
  currentFelyne: string;
};

export const FoodResult = ({
  selectedFoods,
  currentFelyne,
}: FoodResultProps) => {
  const foodEffects = getFoodEffects(currentFelyne, selectedFoods);
  console.log(foodEffects, "foodEffects");
  // console.log(selectedFoods, "selectedFoods");
  // console.log(currentFelyne, "currentFelyne");

  return (
    <div className="rounded-lg border p-2">
      <div className="flex flex-wrap flex-col gap-[5px]">
        {Array.from({ length: 15 }, (_, index) => (
          <div className="rounded-lg border " key={index}>
            <CardHeader className="px-[15px] py-2.5">
              Sample {index + 1}
            </CardHeader>
          </div>
        ))}
      </div>
    </div>
  );
};
