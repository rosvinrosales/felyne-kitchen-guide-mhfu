import React from "react";
import { getFoodEffects } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

type FoodResultProps = {
  selectedFoods: string[];
  currentFelyne: string;
};

export const FoodResult = ({
  selectedFoods,
  currentFelyne,
}: FoodResultProps) => {
  const foodEffectsTemp = getFoodEffects(currentFelyne, selectedFoods);
  const [foodEffects, setFoodEffects] = React.useState(
    getFoodEffects(currentFelyne, selectedFoods)
  );
  const [isEffectsGrouped, setIsEffectsGrouped] = React.useState<
    boolean | string
  >(true);

  const handleCheckGroupEffects = (e: string | boolean) => {
    setIsEffectsGrouped(e);
    handleGroupFoodEffects(e);
  };

  const uniqueFoodCombos = foodEffectsTemp.filter((foodCombo, index, self) => {
    return index === self.findIndex((f) => f.effect === foodCombo.effect);
  });

  const handleGroupFoodEffects = (e: boolean | string) => {
    if (e) {
      setFoodEffects(uniqueFoodCombos);
    } else {
      setFoodEffects(getFoodEffects(currentFelyne, selectedFoods));
    }
  };

  React.useEffect(() => {
    handleGroupFoodEffects(isEffectsGrouped);
  }, [foodEffectsTemp.length]);

  return (
    <div className="rounded-lg border p-2">
      <div className="flex flex-wrap flex-col gap-[8px]">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="group"
            onCheckedChange={(e) => handleCheckGroupEffects(e)}
            defaultChecked={true}
          />
          <label
            htmlFor="group"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Group Same Effects
          </label>
        </div>
        {foodEffects.length > 0 ? (
          foodEffects.map(({ foodCombo, effect, effectStatus }) => (
            <div
              className={`rounded-lg border hover:shadow-md hover:cursor-pointer dark:hover:shadow-gray-800 ${
                effectStatus === "good effect"
                  ? "border-green-300 dark:border-green-900"
                  : effectStatus === "bad effect" &&
                    "border-red-300 dark:border-red-900"
              }`}
              key={foodCombo}
            >
              <div
                className={`px-[15px] py-2.5 text-sm ${
                  effectStatus === "good effect"
                    ? "text-green-600"
                    : effectStatus === "bad effect" && "text-red-600"
                }`}
              >
                <span className="font-bold text-lg">{effect}</span>
                <span className="block capitalize">({foodCombo})</span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border hover:shadow-md hover:cursor-pointer dark:hover:shadow-gray-800">
            <div className="px-[15px] py-2.5 text-sm">Empty</div>
          </div>
        )}
      </div>
    </div>
  );
};
