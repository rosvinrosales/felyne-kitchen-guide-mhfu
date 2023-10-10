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
        food[category]?.includes(foodToFind)
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

export const getFoodEffects = (felyneNum: string, selectedFoods: string[]) => {
  const foodTypes = selectedFoods.map((food) => getFoodType(food));
  const effects: string[] = [];
  const countMap: { [item: string]: number } = {};

  foodTypes.forEach((item) => {
    if (item !== null) {
      countMap[item] = (countMap[item] || 0) + 1;
    }
  });

  if (felyneNum === "1") {
    if (countMap["Meat"] >= 2) {
      effects.push("Meat + Meat = +10 Health");
    }

    if (countMap["Meat"] >= 1 && countMap["Bran"] >= 1) {
      effects.push("Meat + Bran = +10 Health");
    }

    if (countMap["Meat"] >= 1 && countMap["Fish"] >= 1) {
      effects.push("Meat + Fish = -25 Stamina");
    }

    if (countMap["Meat"] >= 1 && countMap["Fruit"] >= 1) {
      effects.push("Meat + Fruit = No Effect");
    }

    if (countMap["Meat"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Meat + Veggie = +25 Stamina");
    }

    if (countMap["Meat"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Meat + Dairy = No Effect");
    }

    if (countMap["Meat"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Meat + Drink = Attack Up Small");
    }

    if (countMap["Bran"] >= 2) {
      effects.push("Bran + Bran = +25 Stamina");
    }

    if (countMap["Bran"] >= 1 && countMap["Fish"] >= 1) {
      effects.push("Bran + Fish = +10 Health");
    }

    if (countMap["Bran"] >= 1 && countMap["Fruit"] >= 1) {
      effects.push("Bran + Fruit = Ice Res +3");
    }

    if (countMap["Bran"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Bran + Veggie = -25 Stamina");
    }

    if (countMap["Bran"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Bran + Dairy = No Effect");
    }

    if (countMap["Bran"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Bran + Drink = -25 Stamina");
    }

    if (countMap["Fish"] >= 2) {
      effects.push("Fish + Fish = Attack Up Small");
    }

    if (countMap["Fish"] >= 1 && countMap["Fruit"] >= 1) {
      effects.push("Fish + Fruit = -10 Health");
    }

    if (countMap["Fish"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Fish + Veggie = +25 Stamina");
    }

    if (countMap["Fish"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Fish + Dairy = No Effect");
    }

    if (countMap["Fish"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Fish + Drink = +10 Defense");
    }

    if (countMap["Fruit"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Fruit + Veggie = +20 Health");
    }

    if (countMap["Fruit"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Fruit + Dairy = +25 Stamina");
    }

    if (countMap["Fruit"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Fruit + Drink = -10 Health");
    }

    if (countMap["Veggie"] >= 2) {
      effects.push("Veggie + Veggie = +10 Defense");
    }

    if (countMap["Veggie"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Veggie + Dairy = No Effect");
    }

    if (countMap["Veggie"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Veggie + Drink = No Effect");
    }

    if (countMap["Dairy"] >= 2) {
      effects.push("Dairy + Dairy = No Effect");
    }

    if (countMap["Dairy"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Dairy + Drink = -10 Health");
    }
  } else if (felyneNum === "2") {
    if (countMap["Meat"] >= 2) {
      effects.push("Meat + Meat = +20 Health");
    }

    if (countMap["Meat"] >= 1 && countMap["Bran"] >= 1) {
      effects.push("Meat + Bran = +15 Defense");
    }

    if (countMap["Meat"] >= 1 && countMap["Fish"] >= 1) {
      effects.push("Meat + Fish = No Effect");
    }

    if (countMap["Meat"] >= 1 && countMap["Fruit"] >= 1) {
      effects.push("Meat + Fruit = Fire Res +3");
    }

    if (countMap["Meat"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Meat + Veggie = -25 Stamina");
    }

    if (countMap["Meat"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Meat + Dairy + -20 Health");
    }

    if (countMap["Meat"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Meat + Drink = +10 Health");
    }

    if (countMap["Bran"] >= 2) {
      effects.push("Bran + Bran = +25 Stamina");
    }

    if (countMap["Bran"] >= 1 && countMap["Fish"] >= 1) {
      effects.push("Bran + Fish = +20 Health");
    }

    if (countMap["Bran"] >= 1 && countMap["Fruit"] >= 1) {
      effects.push("Bran + Fruit = No Effect");
    }

    if (countMap["Bran"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Bran + Veggie = Attack Up Small");
    }

    if (countMap["Bran"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Bran + Dairy = No Effect");
    }

    if (countMap["Bran"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Bran + Drink = +10 Health & Thndr Res +3");
    }

    if (countMap["Fish"] >= 2) {
      effects.push("Fish + Fish = Attack Up Small");
    }

    if (countMap["Fish"] >= 1 && countMap["Fruit"] >= 1) {
      effects.push("Fish + Fruit = No Effect");
    }

    if (countMap["Fish"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Fish + Veggie = No Effect");
    }

    if (countMap["Fish"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Fish + Dairy = -25 Stamina");
    }

    if (countMap["Fish"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Fish + Drink = +25 Stamina");
    }

    if (countMap["Fruit"] >= 2) {
      effects.push("Fruit + Fruit = -20 Health");
    }

    if (countMap["Fruit"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Fruit + Veggie = +10 Defense & +10 Health");
    }

    if (countMap["Fruit"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Fruit + Dairy = Water Res +3");
    }

    if (countMap["Fruit"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Fruit + Drink = No Effect");
    }

    if (countMap["Veggie"] >= 2) {
      effects.push("Veggie + Veggie = +10 Defense");
    }

    if (countMap["Veggie"] >= 1 && countMap["Milk"] >= 1) {
      effects.push("Veggie + Milk = -10 Health & -25 Stamina");
    }

    if (countMap["Veggie"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Veggie + Drink = +25 Stamina");
    }

    if (countMap["Dairy"] >= 2) {
      effects.push("Dairy + Dairy = +25 Stamina & Attack Up Small");
    }

    if (countMap["Dairy"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Dairy + Drink = Ice Res +3");
    }
  } else if (felyneNum === "3") {
    if (countMap["Meat"] >= 2) {
      effects.push("Meat + Meat = +20 Health");
    }

    if (countMap["Meat"] >= 1 && countMap["Bran"] >= 1) {
      effects.push("Meat + Bran = No Effect");
    }

    if (countMap["Meat"] >= 1 && countMap["Fish"] >= 1) {
      effects.push("Meat + Fish = Thunder Res +3");
    }

    if (countMap["Meat"] >= 1 && countMap["Fruit"] >= 1) {
      effects.push("Meat + Fruit = Attack Up Large");
    }

    if (countMap["Meat"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Meat + Veggie = +10 Health & Attack Up Small");
    }

    if (countMap["Meat"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Meat + Dairy = No Effect");
    }

    if (countMap["Meat"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Meat + Drink = -25 Stamina");
    }

    if (countMap["Bran"] >= 2) {
      effects.push("Bran + Bran = +25 Stamina");
    }

    if (countMap["Bran"] >= 1 && countMap["Fish"] >= 1) {
      effects.push("Bran + Fish = No Effect");
    }

    if (countMap["Bran"] >= 1 && countMap["Fruit"] >= 1) {
      effects.push("Bran + Fruit = No Effect");
    }

    if (countMap["Bran"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Bran + Veggie = +50 Stamina");
    }

    if (countMap["Bran"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Bran + Dairy = +10 Defense & Stamina +25");
    }

    if (countMap["Bran"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Bran + Drink = +15 Defense & Water Res +3");
    }

    if (countMap["Fish"] >= 2) {
      effects.push("Fish + Fish = Attack Up Small");
    }

    if (countMap["Fish"] >= 1 && countMap["Fruit"] >= 1) {
      effects.push("Fish + Fruit = +25 Stamina & Fire Res +3");
    }

    if (countMap["Fish"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Fish + Veggie = -30 Health");
    }

    if (countMap["Fish"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Fish + Dairy = +30 Health");
    }

    if (countMap["Fish"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Fish + Drink = -25 Stamina");
    }

    if (countMap["Fruit"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Fruit + Veggie = -30 Health");
    }

    if (countMap["Fruit"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Fruit + Dairy = -20 Health & -25 Stamina");
    }

    if (countMap["Fruit"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Fruit + Drink = Attack Up Small");
    }

    if (countMap["Veggie"] >= 2) {
      effects.push("Veggie + Veggie = +10 Defense");
    }

    if (countMap["Veggie"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Veggie + Dairy = +10 Health & +15 Defense");
    }

    if (countMap["Veggie"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Veggie + Drink = No Effect");
    }

    if (countMap["Dairy"] >= 2) {
      effects.push("Dairy + Dairy = +20 Health & Ice Res +3");
    }

    if (countMap["Dairy"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Dairy + Drink = No Effect");
    }
  } else if (felyneNum === "4") {
    if (countMap["Meat"] >= 2) {
      effects.push("Meat + Meat = +30 Health");
    }

    if (countMap["Meat"] >= 1 && countMap["Bran"] >= 1) {
      effects.push("Meat + Bran = -50 Stamina");
    }

    if (countMap["Meat"] >= 1 && countMap["Fish"] >= 1) {
      effects.push("Meat + Fish = +25 Stamina & Water Res +5");
    }

    if (countMap["Meat"] >= 1 && countMap["Fruit"] >= 1) {
      effects.push("Meat + Fruit = Attack Up Small & Fire Res +5");
    }

    if (countMap["Meat"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Meat + Veggie = No Effect");
    }

    if (countMap["Meat"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Meat + Dairy = +40 Health");
    }

    if (countMap["Meat"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Meat + Drink = +10 Defense & Ice Res +5");
    }

    if (countMap["Bran"] >= 2) {
      effects.push("Bran + Bran = +50 Stamina");
    }

    if (countMap["Bran"] >= 1 && countMap["Fish"] >= 1) {
      effects.push("Bran + Fish = -30 Health & -25 Stamina");
    }

    if (countMap["Bran"] >= 1 && countMap["Fruit"] >= 1) {
      effects.push("Bran + Fruit = -40 Health");
    }

    if (countMap["Bran"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Bran + Veggie = Attack Up Small & +25 Stamina");
    }

    if (countMap["Bran"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Bran + Dairy = +30 Health & Attack Up Small");
    }

    if (countMap["Bran"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Bran + Drink = No Effect");
    }

    if (countMap["Fish"] >= 2) {
      effects.push("Fish + Fish = Attack Up Large");
    }

    if (countMap["Fish"] >= 1 && countMap["Fruit"] >= 1) {
      effects.push("Fish + Fruit = +20 Defense");
    }

    if (countMap["Fish"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Fish + Veggie = +20 Health & Dragon Res +3");
    }

    if (countMap["Fish"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Fish + Dairy = +10 Defense & Thndr Res +3");
    }

    if (countMap["Fish"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Fish + Drink = No Effect");
    }

    if (countMap["Fruit"] >= 2) {
      effects.push("Fruit + Fruit = Attack Up Large & +10 Health");
    }

    if (countMap["Fruit"] >= 1 && countMap["Veggie"] >= 1) {
      effects.push("Fruit + Veggie = +50 Stamina");
    }

    if (countMap["Fruit"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Fruit + Dairy = No Effect");
    }

    if (countMap["Fruit"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Fruit + Drink = +20 Health & +15 Defense");
    }

    if (countMap["Veggie"] >= 2) {
      effects.push("Veggie + Veggie = +15 Defense");
    }

    if (countMap["Veggie"] >= 1 && countMap["Dairy"] >= 1) {
      effects.push("Veggie + Dairy = No Effect");
    }

    if (countMap["Veggie"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Veggie + Drink = +40 Health");
    }

    if (countMap["Dairy"] >= 1 && countMap["Drink"] >= 1) {
      effects.push("Dairy + Drink = +20 Health & +25 Stamina");
    }
  } else if (felyneNum === "5") {
    if (countMap["Meat"] >= 2) {
      effects.push("Meat + Meat = +30 Health");
    }
    /*
      5 FELYNE
      Meat + Bran = No Effect
      Meat + Fish = +20 Health & +50 Stamina
      Meat + Fruit= -40 Health & -25 Stamina
      Meat + Veggie = +40 Health & Attack Up Large
      Meat + Dairy = +25 Stamina & +15 Defense
      Meat + Drink = Attack Up Small & Fire Res +5
      Bran + Bran = +50 Stamina
      Bran + Fish = +40 Health & +20 Defense
      Bran + Fruit = +30 Health & +25 Stamina
      Bran + Veggie = Attack Up Small & +25 Stamina
      Bran + Dairy = -50 Health
      Bran + Drink = +20 Health & Water Res +5
      Fish + Fish = Attack Up Large
      Fish + Fruit = +50 Stamina & +10 Defense
      Fish + Veggie = +10 Defense & Ice Res +5
      Fish + Dairy = No Effect
      Fish + Drink = No Effect
      Fruit + Veggie = No Effect
      Fruit + Dairy = +50 Health & Dragon Res +5
      Fruit + Drink = Attack Up Small & Thndr Res +5
      Veggie + Veggie = +15 Defense
      Veggie + Dairy = +25 Stamina & +20 Defense
      Veggie + Drink = -50 Stamina
      Dairy + Drink = +50 Health & +50 Stamina
    */
  }

  return effects;
};
