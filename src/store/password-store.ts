import { generate } from "generate-password";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const DEFAULT_LENGTH = 12;

export const usePasswordStore = create(
  combine(
    {
      password: "",
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      length: DEFAULT_LENGTH,
      copied: false,
      selectedCount: 4,
    },
    (set) => ({
      password: generate({
        length: DEFAULT_LENGTH,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
      }),
      setLength: (length: number) => {
        set((state) => ({
          length,
          password: generate({
            length,
            uppercase: state.uppercase,
            lowercase: state.lowercase,
            numbers: state.numbers,
            symbols: state.symbols,
          }),
        }));
      },
      setChecks: ({
        uppercase,
        lowercase,
        numbers,
        symbols,
      }: {
        uppercase: boolean;
        lowercase: boolean;
        numbers: boolean;
        symbols: boolean;
      }) =>
        set((state) => ({
          uppercase,
          lowercase,
          numbers,
          symbols,
          selectedCount: [uppercase, lowercase, numbers, symbols].filter(
            (c) => c
          ).length,
          password: generate({
            length: state.length,
            uppercase,
            lowercase,
            numbers,
            symbols,
          }),
        })),
      setCopied: (timeout?: number) => {
        set({ copied: true });
        setTimeout(() => set({ copied: false }), timeout ?? 3000);
      },
      generate: () =>
        set((state) => ({
          password: generate({
            length: state.length,
            uppercase: state.uppercase,
            lowercase: state.lowercase,
            numbers: state.numbers,
            symbols: state.symbols,
          }),
        })),
    })
  )
);
