"use client";

import { ArrowRight, Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { generate } from "generate-password";
import { StrengthMeter } from "./strength-meter";

export function PasswordGenerator() {
  const [length, setLength] = useState(10);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  function handleLengthChange([l]: number[]) {
    setLength(l);
  }

  function handleCheckboxChange(set: Dispatch<SetStateAction<boolean>>) {
    return function curriedChangeFunction(state: boolean) {
      set(state);
    };
  }

  function handleCopy() {
    navigator.clipboard.writeText(password);
    setCopied(true);
  }

  useEffect(() => {
    setPassword(generate({ length, uppercase, lowercase, numbers, symbols }));
  }, [length, uppercase, lowercase, numbers, symbols]);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const isDisabled =
    [uppercase, lowercase, numbers, symbols].filter((x) => x).length <= 1;

  return (
    <div className="flex flex-col max-w-md mx-auto mt-32 space-y-4">
      <h1 className="self-center text-foreground/70 text-xl">
        Password Generator
      </h1>
      <div className="bg-foreground/10 p-4 flex justify-between">
        <span className="truncate overflow-ellipsis">{password}</span>
        {copied ? (
          <Check className="text-accent" />
        ) : (
          <Copy
            className="shrink-0 text-accent hover:text-foreground cursor-pointer"
            onClick={handleCopy}
          />
        )}
      </div>
      <div className="bg-foreground/10 p-4">
        <div className="flex justify-between items-center mb-4">
          <span>Character Length</span>
          <span className="text-accent font-bold text-xl">{length}</span>
        </div>
        <Slider
          value={[length]}
          min={0}
          max={64}
          onValueChange={handleLengthChange}
        />
        <div className="my-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={uppercase}
              onCheckedChange={handleCheckboxChange(setUppercase)}
              disabled={isDisabled && uppercase}
            />
            <Label htmlFor="uppercase">
              <span className="">Include Uppercase Letters</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={lowercase}
              onCheckedChange={handleCheckboxChange(setLowercase)}
              disabled={isDisabled && lowercase}
            />
            <Label htmlFor="lowercase">
              <span className="">Include Lowercase Letters</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="number"
              checked={numbers}
              onCheckedChange={handleCheckboxChange(setNumbers)}
              disabled={isDisabled && numbers}
            />
            <Label htmlFor="number">
              <span className="">Include Numbers</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={symbols}
              onCheckedChange={handleCheckboxChange(setSymbols)}
              disabled={isDisabled && symbols}
            />
            <Label htmlFor="symbols">
              <span className="">Include Symbols</span>
            </Label>
          </div>
        </div>
        <div className="flex justify-between bg-background p-4 my-4">
          <span className="text-sm text-foreground/50">STRENGTH</span>
          <StrengthMeter password={password} />
        </div>
        <Button
          className="w-full"
          onClick={() =>
            setPassword(
              generate({ length, uppercase, lowercase, numbers, symbols })
            )
          }
        >
          GENERATE <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
