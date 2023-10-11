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

  return (
    <div className="rounded-lg border p-2">
      <div className="flex flex-wrap flex-col gap-[8px]">
        {foodEffects.length > 0 ? (
          foodEffects.map(({ foodCombo, effect, effectStatus }) => (
            <div
              className={`rounded-lg border hover:shadow-md hover:cursor-pointer dark:hover:shadow-gray-800 `}
              key={foodCombo}
            >
              <div
                className={`px-[15px] py-2.5 text-sm ${
                  effectStatus === "good effect"
                    ? "text-green-600"
                    : effectStatus === "bad effect" && "text-red-600"
                }`}
              >
                <span className="block">({foodCombo})</span>
                {effect}
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
