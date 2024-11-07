"use client";

import { ArrowRight, Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { StrengthMeter } from "./strength-meter";
import { usePasswordStore } from "@/store/password-store";

export function PasswordGenerator() {
  const {
    password,
    copied,
    length,
    uppercase,
    lowercase,
    numbers,
    symbols,
    selectedCount,
    generate,
    setLength,
    setCopied,
    setChecks,
  } = usePasswordStore();

  function handleCopy() {
    navigator.clipboard.writeText(password);
    setCopied();
  }

  function handleCheckboxChange(
    key: "uppercase" | "lowercase" | "numbers" | "symbols"
  ) {
    return (value: boolean) =>
      setChecks({
        uppercase,
        lowercase,
        numbers,
        symbols,
        [key]: value,
      });
  }

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
          onValueChange={([length]) => setLength(length)}
        />
        <div className="my-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={uppercase}
              onCheckedChange={handleCheckboxChange("uppercase")}
              disabled={selectedCount <= 1 && uppercase}
            />
            <Label htmlFor="uppercase">
              <span className="">Include Uppercase Letters</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={lowercase}
              onCheckedChange={handleCheckboxChange("lowercase")}
              disabled={selectedCount <= 1 && lowercase}
            />
            <Label htmlFor="lowercase">
              <span className="">Include Lowercase Letters</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="number"
              checked={numbers}
              onCheckedChange={handleCheckboxChange("numbers")}
              disabled={selectedCount <= 1 && numbers}
            />
            <Label htmlFor="number">
              <span className="">Include Numbers</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={symbols}
              onCheckedChange={handleCheckboxChange("symbols")}
              disabled={selectedCount <= 1 && symbols}
            />
            <Label htmlFor="symbols">
              <span className="">Include Symbols</span>
            </Label>
          </div>
        </div>
        <div className="flex justify-between bg-background p-4 my-4">
          <span className="text-sm text-foreground/50">STRENGTH</span>
          <StrengthMeter />
        </div>
        <Button className="w-full" onClick={() => generate()}>
          GENERATE <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
