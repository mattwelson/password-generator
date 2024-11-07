import { cn } from "@/lib/utils";
import { usePasswordStore } from "@/store/password-store";
import { passwordStrength } from "check-password-strength";
import { useMemo } from "react";

export function StrengthMeterTick({
  index,
  strength,
}: {
  index: number;
  strength: number;
}) {
  return (
    <div
      className={cn("h-6 w-2 border-white border", {
        "border-amber-500 bg-amber-500": index <= strength,
        "border-red-500 bg-red-500": index <= strength && strength === 0,
        "border-green-500 bg-green-500": index <= strength && strength === 3,
      })}
    />
  );
}

export function StrengthMeter() {
  const password = usePasswordStore(({ password }) => password);
  const strength = useMemo(
    () =>
      passwordStrength(password, [
        {
          id: 0,
          value: "Too weak",
          minDiversity: 0,
          minLength: 0,
        },
        {
          id: 1,
          value: "Weak",
          minDiversity: 2,
          minLength: 6,
        },
        {
          id: 2,
          value: "Medium",
          minDiversity: 2,
          minLength: 10,
        },
        {
          id: 3,
          value: "Strong",
          minDiversity: 3,
          minLength: 16,
        },
      ]),
    [password]
  );
  return (
    <div className="flex gap-2">
      <span className="uppercase font-bold">{strength.value}</span>
      {[0, 1, 2, 3].map((tick) => (
        <StrengthMeterTick key={tick} index={tick} strength={strength.id} />
      ))}
    </div>
  );
}
