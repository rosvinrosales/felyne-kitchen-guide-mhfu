import {
  Beef,
  Cherry,
  Fish,
  GlassWater,
  LeafyGreen,
  Milk,
  Wheat,
  X,
} from "lucide-react";
import { CardHeader } from "@/components/ui/card";
import { getFoodType } from "@/lib/utils";

type FoodSelectedProps = {
  selectedFoods: string[];
  handleRemoveSelectedFood: (value: string) => void;
};

export const FoodSelected = ({
  selectedFoods,
  handleRemoveSelectedFood,
}: FoodSelectedProps) => {
  const getIcon = (category: string | null) => {
    switch (category) {
      case "Bran":
        return <Wheat />;
      case "Meat":
        return <Beef />;
      case "Fruit":
        return <Cherry />;
      case "Dairy":
        return <Milk />;
      case "Drink":
        return <GlassWater />;
      case "Fish":
        return <Fish />;
      case "Veg":
        return <LeafyGreen />;
      default:
    }
  };

  return (
    <div className="rounded-lg border p-2">
      <div className="flex flex-wrap gap-2.5">
        {selectedFoods.length > 0 ? (
          selectedFoods.map((food, index) => (
            <div
              className="transition rounded-lg border hover:shadow-md hover:cursor-pointer dark:hover:shadow-gray-800"
              key={index}
            >
              <CardHeader className="px-[15px] py-2.5 capitalize items-center gap-1">
                <div className="flex justify-end w-full">
                  <X
                    className="w-4 h-4 text-gray-400 hover:text-gray-50"
                    onClick={() => handleRemoveSelectedFood(food)}
                  />
                </div>
                {getIcon(getFoodType(food))}
                <span className="text-xs text-center">
                  {food}
                  <span className="block text-center">
                    ({getFoodType(food)})
                  </span>
                </span>
              </CardHeader>
            </div>
          ))
        ) : (
          <CardHeader className="px-[15px] py-2.5">Empty</CardHeader>
        )}
      </div>
    </div>
  );
};
