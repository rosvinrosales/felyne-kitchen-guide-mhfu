import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type FoodsProps = {
  Felyne: number;
  Meat: string[];
  Bran: string[];
  Fish: string[];
  Veg: string[];
  Fruit: string[];
  Dairy: string[];
  Drink: string[];
  [key: string]: number | string[];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeEveryWord = (str: string) => {
  return str.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
};

export const convertFoodsToArray = (foods: FoodsProps) => {
  return Object.entries(foods)
    .filter(([key]) => key !== "Felyne")
    .flatMap(
      ([, value]) =>
        (Array?.isArray(value) ? value : [value]) as readonly string[]
    );
};

export const getCategoryIcon = (category: string | null) => {
  switch (category) {
    case "Bran":
      return "Wheat";
    case "Meat":
      return "Beef";
    case "Fruit":
      return "Cherry";
    case "Dairy":
      return "Milk";
    case "Drink":
      return "GlassWater";
    case "Fish":
      return "Fish";
    case "Veg":
      return "LeafyGreen";
    default:
  }
};

export const getFoodType = (foodToFind: string) => {
  const foods: FoodsProps[] = getFoodsRawAll();

  for (const food of foods) {
    for (const category in food) {
      if (
        Array.isArray(food[category]) &&
        (food[category] as string[]).includes(foodToFind)
      ) {
        return category;
      }
    }
  }
  return null;
};

export const getFoodsRawAll = () => {
  return [
    {
      Felyne: 1,
      Meat: ["meat scraps", "rubbery jerky", "tough meat"],
      Bran: ["chunky rice", "furahiya wheat", "mixed beans"],
      Fish: ["bone taco", "clam chip", "scalefish"],
      Veg: ["twinshroom", "jungle onion", "pumpkin"],
      Fruit: ["oily raisins"],
      Dairy: ["powdered cheese", "sticky cream"],
      Drink: ["hopi"],
    },
    {
      Felyne: 2,
      Meat: ["cubesteak", "spicy sausage", "wild bacon"],
      Bran: ["hardtack", "snowy rice"],
      Fish: ["snake salmon", "tuna head"],
      Veg: ["mild herb", "sliced cactus", "spotted onion", "young potato"],
      Fruit: ["fruity jam", "northern orange"],
      Dairy: ["aged cheese", "carefree yogurt"],
      Drink: ["furahiya cola"],
    },
    {
      Felyne: 3,
      Meat: ["great mutton", "juicy rib roast", "meatwagon"],
      Bran: ["kut beans", "tasty rice", "warwheat"],
      Fish: ["curved shrimp", "horseshoe crab", "spiky blowfish"],
      Veg: ["cudgel onion", "spicy carrots", "western parsley"],
      Fruit: ["frozen apples"],
      Dairy: ["buffalo butter", "chili cheese"],
      Drink: ["panish"],
    },
    {
      Felyne: 4,
      Meat: ["dragon foot", "gator ribmeat", "princess pork"],
      Bran: ["ancient beans", "kokoto rice", "megabagel"],
      Fish: ["king squid", "queen shrimp", "pink caviar"],
      Veg: ["cannon lettuce", "rare onion", "scented celery"],
      Fruit: ["burning mango", "lifejam"],
      Dairy: ["royale cheese"],
      Drink: ["blessed wine"],
    },
    {
      Felyne: 5,
      Meat: ["bigmeat", "dragon head", "dragon tail", "king turkey"],
      Bran: ["gold rice", "heaven bread", "soul beans"],
      Fish: ["1,000 year crab", "crimson seabream", "hairy tuna"],
      Veg: ["demonshroom", "fatty tomato", "king truffle"],
      Fruit: ["emerald durian"],
      Dairy: ["kirin cheese"],
      Drink: ["goldenfish brew"],
    },
  ];
};

export const getFoodsRaw = (felyneNum: string) => {
  const num = parseInt(felyneNum);
  const foods = getFoodsRawAll();
  const felyneFood = foods.find((food) => food.Felyne === num);

  return felyneFood;
};

export const getCombinations = (
  type1: string,
  type2: string,
  selectedFoodsGrouped: { [key: string]: string[] },
  effect: string,
  effectStatus: "good effect" | "bad effect" | "no effect"
) => {
  const combinations: {
    foodCombo: string;
    effect: string;
    effectStatus: "good effect" | "bad effect" | "no effect";
  }[] = [];

  for (const food1 of selectedFoodsGrouped[type1]) {
    for (const food2 of selectedFoodsGrouped[type2]) {
      const combination = `${food2} + ${food1}`;
      const reverseCombination = `${food1} + ${food2}`;

      if (
        combination !== reverseCombination &&
        !combinations.some((c) => c.foodCombo === combination) &&
        !combinations.some((c) => c.foodCombo === reverseCombination)
      ) {
        combinations.push({
          foodCombo: combination,
          effect: effect,
          effectStatus: effectStatus,
        });
      }
    }
  }

  return combinations;
};

export const getFoodEffects = (felyneNum: string, selectedFoods: string[]) => {
  const foodTypes = selectedFoods.map((food) => getFoodType(food));
  const foodsRaw: { [key: string]: number | string[] } | undefined =
    getFoodsRaw(felyneNum);
  const selectedFoodsGrouped: { [key: string]: string[] } = {};

  for (const food of selectedFoods) {
    for (const key in foodsRaw) {
      if (
        Array.isArray(foodsRaw[key]) &&
        (foodsRaw[key] as string[]).includes(food)
      ) {
        selectedFoodsGrouped[key] = selectedFoodsGrouped[key] || [];
        selectedFoodsGrouped[key].push(food);
      }
    }
  }

  const effects: {
    foodCombo: string;
    effect: string;
    effectStatus: "good effect" | "bad effect" | "no effect";
  }[] = [];
  const countMap: { [item: string]: number } = {};

  foodTypes.forEach((item) => {
    if (item !== null) {
      countMap[item] = (countMap[item] || 0) + 1;
    }
  });

  if (Object.keys(selectedFoodsGrouped).length > 0) {
    if (felyneNum === "1") {
      if (countMap["Meat"] >= 2) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Meat",
            selectedFoodsGrouped,
            "+10 Health",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Bran"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Bran",
            selectedFoodsGrouped,
            "+10 Health",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Fish"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Fish",
            selectedFoodsGrouped,
            "-25 Stamina",
            "bad effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Fruit",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Veggie",
            selectedFoodsGrouped,
            "+25 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Dairy",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Drink",
            selectedFoodsGrouped,
            "Attack Up Small",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 2) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Bran",
            selectedFoodsGrouped,
            "+25 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Fish"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Fish",
            selectedFoodsGrouped,
            "+10 Health",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Fruit",
            selectedFoodsGrouped,
            "Ice Res +3",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Veggie",
            selectedFoodsGrouped,
            "-25 Stamina",
            "no effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Dairy",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Drink",
            selectedFoodsGrouped,
            "-25 Stamina",
            "bad effect"
          )
        );
      }

      if (countMap["Fish"] >= 2) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Fish",
            selectedFoodsGrouped,
            "Attack Up Small",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Fruit",
            selectedFoodsGrouped,
            "-10 Health",
            "bad effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Veggie",
            selectedFoodsGrouped,
            "+25 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Dairy",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Drink",
            selectedFoodsGrouped,
            "+10 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Veggie",
            selectedFoodsGrouped,
            "+20 Health",
            "good effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Dairy",
            selectedFoodsGrouped,
            "+25 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Drink",
            selectedFoodsGrouped,
            "-10 Health",
            "bad effect"
          )
        );
      }

      if (countMap["Veggie"] >= 2) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Veggie",
            selectedFoodsGrouped,
            "+10 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Veggie"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Dairy",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Veggie"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Drink",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Dairy"] >= 2) {
        effects.push(
          ...getCombinations(
            "Dairy",
            "Dairy",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Dairy"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Dairy",
            "Drink",
            selectedFoodsGrouped,
            "-10 Health",
            "bad effect"
          )
        );
      }
    } else if (felyneNum === "2") {
      if (countMap["Meat"] >= 2) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Meat",
            selectedFoodsGrouped,
            "+20 Health",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Bran"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Bran",
            selectedFoodsGrouped,
            "+15 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Fish"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Fish",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Fruit",
            selectedFoodsGrouped,
            "Fire Res +3",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Veggie",
            selectedFoodsGrouped,
            "-25 Stamina",
            "bad effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Dairy",
            selectedFoodsGrouped,
            "-20 Health",
            "bad effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Drink",
            selectedFoodsGrouped,
            "+10 Health",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 2) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Bran",
            selectedFoodsGrouped,
            "+25 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Fish"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Fish",
            selectedFoodsGrouped,
            "+20 Health",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Fruit",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Veggie",
            selectedFoodsGrouped,
            "Attack Up Small",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Dairy",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Drink",
            selectedFoodsGrouped,
            "+10 Health & Thndr Res +3",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 2) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Fish",
            selectedFoodsGrouped,
            "Attack Up Small",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Fruit",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Veggie",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Dairy",
            selectedFoodsGrouped,
            "-25 Stamina",
            "bad effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Drink",
            selectedFoodsGrouped,
            "+25 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Fruit"] >= 2) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Fruit",
            selectedFoodsGrouped,
            "-20 Health",
            "bad effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Veggie",
            selectedFoodsGrouped,
            "+10 Defense & +10 Health",
            "good effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Dairy",
            selectedFoodsGrouped,
            "Water Res +3",
            "good effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Drink",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Veggie"] >= 2) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Veggie",
            selectedFoodsGrouped,
            "+10 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Veggie"] >= 1 && countMap["Milk"] >= 1) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Milk",
            selectedFoodsGrouped,
            "-10 Health & -25 Stamina",
            "bad effect"
          )
        );
      }

      if (countMap["Veggie"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Drink",
            selectedFoodsGrouped,
            "+25 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Dairy"] >= 2) {
        effects.push(
          ...getCombinations(
            "Dairy",
            "Dairy",
            selectedFoodsGrouped,
            "+25 Stamina & Attack Up Small",
            "good effect"
          )
        );
      }

      if (countMap["Dairy"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Dairy",
            "Drink",
            selectedFoodsGrouped,
            "Ice Res +3",
            "good effect"
          )
        );
      }
    } else if (felyneNum === "3") {
      if (countMap["Meat"] >= 2) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Meat",
            selectedFoodsGrouped,
            "+20 Health",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Bran"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Bran",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Fish"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Fish",
            selectedFoodsGrouped,
            "Thunder Res +3",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Fruit",
            selectedFoodsGrouped,
            "Attack Up Large",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Veggie",
            selectedFoodsGrouped,
            "+10 Health & Attack Up Small",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Dairy",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Drink",
            selectedFoodsGrouped,
            "-25 Stamina",
            "bad effect"
          )
        );
      }

      if (countMap["Bran"] >= 2) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Bran",
            selectedFoodsGrouped,
            "+25 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Fish"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Fish",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Fruit",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Veggie",
            selectedFoodsGrouped,
            "+50 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Dairy",
            selectedFoodsGrouped,
            "+10 Defense & Stamina +25",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Drink",
            selectedFoodsGrouped,
            "+15 Defense & Water Res +3",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 2) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Fish",
            selectedFoodsGrouped,
            "Attack Up Small",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Fruit",
            selectedFoodsGrouped,
            "+25 Stamina & Fire Res +3",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Veggie",
            selectedFoodsGrouped,
            "-30 Health",
            "bad effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Dairy",
            selectedFoodsGrouped,
            "+30 Health",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Drink",
            selectedFoodsGrouped,
            "-25 Stamina",
            "bad effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Veggie",
            selectedFoodsGrouped,
            "-30 Health",
            "bad effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Dairy",
            selectedFoodsGrouped,
            "-20 Health & -25 Stamina",
            "bad effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Drink",
            selectedFoodsGrouped,
            "Attack Up Small",
            "good effect"
          )
        );
      }

      if (countMap["Veggie"] >= 2) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Veggie",
            selectedFoodsGrouped,
            "+10 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Veggie"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Dairy",
            selectedFoodsGrouped,
            "+10 Health & +15 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Veggie"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Drink",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Dairy"] >= 2) {
        effects.push(
          ...getCombinations(
            "Dairy",
            "Dairy",
            selectedFoodsGrouped,
            "+20 Health & Ice Res +3",
            "good effect"
          )
        );
      }

      if (countMap["Dairy"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Dairy",
            "Drink",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }
    } else if (felyneNum === "4") {
      if (countMap["Meat"] >= 2) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Meat",
            selectedFoodsGrouped,
            "+30 Health",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Bran"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Bran",
            selectedFoodsGrouped,
            "-50 Stamina",
            "bad effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Fish"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Fish",
            selectedFoodsGrouped,
            "+25 Stamina & Water Res +5",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Fruit",
            selectedFoodsGrouped,
            "Attack Up Small & Fire Res +5",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Veggie",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Dairy",
            selectedFoodsGrouped,
            "+40 Health",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Drink",
            selectedFoodsGrouped,
            "+10 Defense & Ice Res +5",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 2) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Bran",
            selectedFoodsGrouped,
            "+50 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Fish"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Fish",
            selectedFoodsGrouped,
            "-30 Health & -25 Stamina",
            "bad effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Fruit",
            selectedFoodsGrouped,
            "-40 Health",
            "bad effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Veggie",
            selectedFoodsGrouped,
            "Attack Up Small & +25 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Dairy",
            selectedFoodsGrouped,
            "+30 Health & Attack Up Small",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Drink",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Fish"] >= 2) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Fish",
            selectedFoodsGrouped,
            "Attack Up Large",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Fruit",
            selectedFoodsGrouped,
            "+20 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Veggie",
            selectedFoodsGrouped,
            "+20 Health & Dragon Res +3",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Dairy",
            selectedFoodsGrouped,
            "+10 Defense & Thndr Res +3",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Drink",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Fruit"] >= 2) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Fruit",
            selectedFoodsGrouped,
            "Attack Up Large & +10 Health",
            "good effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Veggie",
            selectedFoodsGrouped,
            "+50 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Dairy",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Drink",
            selectedFoodsGrouped,
            "+20 Health & +15 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Veggie"] >= 2) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Veggie",
            selectedFoodsGrouped,
            "+15 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Veggie"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Dairy",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Veggie"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Drink",
            selectedFoodsGrouped,
            "+40 Health",
            "good effect"
          )
        );
      }

      if (countMap["Dairy"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Dairy",
            "Drink",
            selectedFoodsGrouped,
            "+20 Health & +25 Stamina",
            "good effect"
          )
        );
      }
    } else if (felyneNum === "5") {
      if (countMap["Meat"] >= 2) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Meat",
            selectedFoodsGrouped,
            "+30 Health",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Bran"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Bran",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Fish"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Fish",
            selectedFoodsGrouped,
            "+20 Health & +50 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Fruit",
            selectedFoodsGrouped,
            "-40 Health & -25 Stamina",
            "bad effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Veggie",
            selectedFoodsGrouped,
            "+40 Health & Attack Up Large",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Dairy",
            selectedFoodsGrouped,
            "+25 Stamina & +15 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Meat"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Meat",
            "Drink",
            selectedFoodsGrouped,
            "Attack Up Small & Fire Res +5",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 2) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Bran",
            selectedFoodsGrouped,
            "+50 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Fish"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Fish",
            selectedFoodsGrouped,
            "+40 Health & +20 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Fruit",
            selectedFoodsGrouped,
            "+30 Health & +25 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Veggie",
            selectedFoodsGrouped,
            "Attack Up Small & +25 Stamina",
            "good effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Dairy",
            selectedFoodsGrouped,
            "-50 Health",
            "bad effect"
          )
        );
      }

      if (countMap["Bran"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Bran",
            "Drink",
            selectedFoodsGrouped,
            "+20 Health & Water Res +5",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 2) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Fish",
            selectedFoodsGrouped,
            "Attack Up Large",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Fruit"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Fruit",
            selectedFoodsGrouped,
            "+50 Stamina & +10 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Veggie",
            selectedFoodsGrouped,
            "+10 Defense & Ice Res +5",
            "good effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Dairy",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Fish"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fish",
            "Drink",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Veggie"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Veggie",
            selectedFoodsGrouped,
            "No Effect",
            "no effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Dairy",
            selectedFoodsGrouped,
            "+50 Health & Dragon Res +5",
            "good effect"
          )
        );
      }

      if (countMap["Fruit"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Fruit",
            "Drink",
            selectedFoodsGrouped,
            "Attack Up Small & Thndr Res +5",
            "good effect"
          )
        );
      }

      if (countMap["Veggie"] >= 2) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Veggie",
            selectedFoodsGrouped,
            "+15 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Veggie"] >= 1 && countMap["Dairy"] >= 1) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Dairy",
            selectedFoodsGrouped,
            "+25 Stamina & +20 Defense",
            "good effect"
          )
        );
      }

      if (countMap["Veggie"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Veggie",
            "Drink",
            selectedFoodsGrouped,
            "-50 Stamina",
            "bad effect"
          )
        );
      }

      if (countMap["Dairy"] >= 1 && countMap["Drink"] >= 1) {
        effects.push(
          ...getCombinations(
            "Dairy",
            "Drink",
            selectedFoodsGrouped,
            "+50 Health & +50 Stamina",
            "good effect"
          )
        );
      }
    }
  }

  return effects;
};
