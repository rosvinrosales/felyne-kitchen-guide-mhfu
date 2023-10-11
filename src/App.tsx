import React from "react";
import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FelyneSelect } from "@/components/felyne-select";
import { FoodSelect } from "@/components/food-select";
import { FoodSelected } from "@/components/food-selected";
import { FoodResult } from "@/components/food-result";
import { getFoodsRaw, FoodsProps } from "@/lib/utils";

const App = () => {
  const [currentFelyne, setCurrentFelyne] = React.useState<string>("");
  const [currentFoods, setCurrentFoods] = React.useState<
    FoodsProps | undefined
  >(undefined);
  const [selectedFoods, setSelectedFoods] = React.useState<string[]>([]);
  const [currentFoodsArray, setCurrentFoodsArray] = React.useState<string[]>(
    []
  );

  const onSelectFelyne = (value: string) => {
    setCurrentFoods(getFoodsRaw(value));
    setCurrentFelyne(value);
    setCurrentFoodsArray([]);
    setSelectedFoods([]);
  };

  const onSelectFood = (value: string) => {
    setSelectedFoods((prev) => [...prev, value]);
  };

  const handleRemoveSelectedFood = (value: string) => {
    setSelectedFoods((prev) => prev.filter((food) => food !== value));
    setCurrentFoodsArray((prev) => [...prev, value]);
  };

  return (
    <>
      <div className="flex flex-col items-center px-10 py-20">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-5 justify-between">
              Felyne Kitchen Guide (MHFU)
              <ModeToggle />
            </CardTitle>
            <CardDescription>-</CardDescription>
          </CardHeader>
          <CardContent className="gap-5 flex flex-col">
            <FelyneSelect onSelectFelyne={onSelectFelyne} />
            <FoodSelect
              currentFoods={currentFoods}
              onSelectFood={onSelectFood}
              setCurrentFoodsArray={setCurrentFoodsArray}
              currentFoodsArray={currentFoodsArray}
            />
            <FoodSelected
              selectedFoods={selectedFoods}
              handleRemoveSelectedFood={handleRemoveSelectedFood}
            />
            <FoodResult
              selectedFoods={selectedFoods}
              currentFelyne={currentFelyne}
            />
          </CardContent>
          <CardFooter>
            <div className="text-xs">
              <p>WHIM SKILLS LIST</p>
              <p>
                Frugality = Stops Breakable items, such as Pickaxes and Bugnets
                from breaking as often
              </p>
              <p>Kickboxer = Increases the power of Kicks</p>
              <p>Treat Break Makes is that you bunse of wens as often.</p>
              <p>
                Culinary Arts = Rare Steaks become Well Done, Well Done Becomes
                Gourmet
              </p>
              <p>Negotiations = Gives you rarer items from the Vege Elder.</p>
              <p>Woodwinds = Stops Flutes from breaking as easily.</p>
              <p>
                Charisma = Gives you longer conversations with the Vege Elder.
              </p>
              <p>
                Ballooner = 100% chance of Balloon appearing on a daytime Quest.
              </p>
              <p>
                Blunt Force = Increases attack power of Bow Gun's melee attack.
              </p>
              <p>Temper = Power of Bowguns increase, range decreases.</p>
              <p>Gathering = Rarer items from gathering are proccured.</p>
              <p>
                Escape = When sprinting from a Monster, you lose less Stamina.
              </p>
              <p>Heroics = When low on health, defense and attack increases.</p>
              <p>Aim = Normal S power increase.</p>
              <p>Medicine = Healing items heal more.</p>
              <p>Gastronomy = Fish restors stamina when you eat it.</p>
              <p>
                Defense = Chance of decreased damage when a Monster hits you.
              </p>
              <p>Vine Climber = Climb Vines faster.</p>
              <p>Combine = Higher chance of success rate when combining.</p>
              <p>Martial Arts = Rolling takes less Stamina.</p>
              <p>
                Strongcat = When carrying an Egg, small attacks such as insects
                can't interrupt you.
              </p>
              <p>Fighter = 'Taunt' Gesture does more damage =/</p>
              <p>Super Carver = Can't be interrupted from carving.</p>
              <p>Vine Master = Can't be interrupted from Vine Climbing.</p>
              <p>Gunpowder = Bombs do more damage.</p>
              <p>Explorer = 100% chance of starting in Secret Area.</p>
              <p>Special Attack = Elemental Damage does more.</p>
              <p>Supercat = Lose less Stamina when running with an egg.</p>
              <p>Fear Factor = Weaker Monsters appear on Quests.</p>
              <p>Exchanger = More Pokke Points.</p>
              <p>Courage = No Monster scares you.</p>
              <p>
                Resilience = When knocked down you become invincible while you
                get up.
              </p>
              <p>Ultra Lucky Cat = Chance of better rewards.</p>
              <p>Dismantle = Chance of an extra carve.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default App;
