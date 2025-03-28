import { X } from "lucide-react";
import { CardHeader } from "@/components/ui/card";
// import { getFoodType } from "@/lib/utils";

type FoodSelectedProps = {
  selectedFoods: string[];
  handleRemoveSelectedFood: (value: string) => void;
};

export const FoodSelected = ({
  selectedFoods,
  handleRemoveSelectedFood,
}: FoodSelectedProps) => {
  // const IconComponent = LucideIcons[getFoodType(food)];

  // const getIcon = (category: string | null) => {
  //   const baseClass = "mr-2 h-4 w-4";

  //   switch (category) {
  //     case "Bran":
  //       return <Wheat className={baseClass} />;
  //     case "Meat":
  //       return <Beef className={baseClass} />;
  //     case "Fruit":
  //       return <Cherry className={baseClass} />;
  //     case "Dairy":
  //       return <Milk className={baseClass} />;
  //     case "Drink":
  //       return <GlassWater className={baseClass} />;
  //     case "Fish":
  //       return <Fish className={baseClass} />;
  //     case "Veg":
  //       return <LeafyGreen className={baseClass} />;
  //     default:
  //   }
  // };

  return (
    <div className="rounded-lg border p-2">
      <div className="flex flex-wrap gap-2.5">
        {selectedFoods.length > 0 ? (
          selectedFoods.map((food, index) => (
            <div
              className="transition rounded-lg border hover:shadow-md hover:cursor-pointer dark:hover:shadow-gray-800 min-w-[90px]"
              key={index}
            >
              <CardHeader className="px-[15px] py-2.5 capitalize flex-row items-center">
                {/* {LucideIcons[getFoodType(food)]} */}
                {/* <IconComponent className="mr-2 h-4 w-4" /> */}
                {/* {getIcon(getFoodType(food))} */}
                <span className="text-sm text-center !mt-0 text-muted-foreground">
                  {food}
                </span>
                <X
                  className="w-4 h-4 text-gray-400 hover:text-gray-50 !mt-0 ml-4"
                  onClick={() => handleRemoveSelectedFood(food)}
                />
              </CardHeader>
            </div>
          ))
        ) : (
          <CardHeader className="px-[15px] py-2.5 text-sm">Empty</CardHeader>
        )}
      </div>
    </div>
  );
};
