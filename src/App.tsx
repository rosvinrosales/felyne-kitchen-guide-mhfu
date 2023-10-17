import React from "react";
import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FelyneSelect } from "@/components/felyne-select";
import { FoodSelect } from "@/components/food-select";
import { FoodSelected } from "@/components/food-selected";
import { FoodResult } from "@/components/food-result";
import { getFoodsRaw, FoodsProps } from "@/lib/utils";
import { Footer } from "./components/footer";
import { Button } from "./components/ui/button";
import { RotateCcw } from "lucide-react";

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

  const handleReset = () => {
    setCurrentFoodsArray([]);
    setCurrentFoods(getFoodsRaw(currentFelyne));
    setSelectedFoods([]);
  };

  return (
    <>
      <div className="flex flex-col items-center px-3 py-5 md:py-20">
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
            <Button onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </CardContent>
          <Footer />
        </Card>
      </div>
    </>
  );
};

export default App;
