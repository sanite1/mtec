// components/products/VariantBuilder.tsx
import React, { useMemo, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash, ChevronRight, Check, X } from "lucide-react";

/**
 * Types
 */
type OptionValue = {
  id: string;
  value: string;
};

export type OptionGroup = {
  id: string;
  name: string; // e.g. "Color"
  values: OptionValue[]; // e.g. [{value: "Red"}, {value:"Blue"}]
};

export type CombinationFormRow = {
  name: string; // auto: "Red / Small"
  sku?: string;
  price?: string;
  costPrice?: string;
  discountPrice?: string;
  stock?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (
    variants: CombinationFormRow[],
    OptionGroup: OptionGroup[],
  ) => void;
};

/**
 * Zod validation for combination row (strings because react-hook-form inputs are strings)
 */
const combinationSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1, "SKU required"),
  price: z
    .string()
    .refine((v) => v.trim() !== "" && !isNaN(Number(v)), "Price required"),
  costPrice: z
    .string()
    .optional()
    .refine((v) => v === undefined || v.trim() === "" || !isNaN(Number(v)), {
      message: "Must be a number",
    }),
  discountPrice: z
    .string()
    .optional()
    .refine((v) => v === undefined || v.trim() === "" || !isNaN(Number(v)), {
      message: "Must be a number",
    }),
  stock: z
    .string()
    .refine((v) => v.trim() !== "" && Number(v) >= 0 && !isNaN(Number(v)), {
      message: "Stock required (0+)",
    }),
});

const combosSchema = z.object({
  combos: z
    .array(combinationSchema)
    .min(1, "At least one combination required"),
});

/**
 * Helper: generate unique id
 */
const uid = (prefix = "") =>
  prefix + Math.random().toString(36).substring(2, 9);

/**
 * Helper: cartesian product of arrays of strings
 */
function cartesian<T>(arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>(
    (acc, arr) =>
      acc
        .map((a) => arr.map((b) => a.concat([b])))
        .reduce((a, b) => a.concat(b), []),
    [[]] as T[][],
  );
}

/**
 * Component
 */
export default function VariantBuilder({ open, onClose, onCreate }: Props) {
  // Option groups management (local state)
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([]);

  // temp fields for adding a new option group
  const [newGroupName, setNewGroupName] = useState("");
  const [step, setStep] = useState(1);
  const [newGroupValue, setNewGroupValue] = useState("");

  // form for combinations
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{ combos: CombinationFormRow[] }>({
    resolver: zodResolver(combosSchema) as any,
    defaultValues: { combos: [] },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "combos",
  });

  /** Generate combinations when optionGroups change */
  const combinations = useMemo(() => {
    if (!optionGroups.length) return [];

    // arrays of option strings
    const arrays = optionGroups.map((g) =>
      g.values.filter((v) => v.value.trim() !== "").map((v) => v.value.trim()),
    );

    // if any group has zero values -> no combos
    if (arrays.some((a) => a.length === 0)) return [];

    const product = cartesian(arrays); // array of arrays of strings
    // build human readable name e.g. "Blue / Small"
    return product.map((parts) => parts.join(" / "));
  }, [optionGroups]);

  /** Initialize combos form rows from combinations (auto-fill name) */
  React.useEffect(() => {
    if (combinations.length === 0) {
      replace([]);
      return;
    }
    // create default rows for each combo
    const rows: CombinationFormRow[] = combinations.map((name) => ({
      name,
      sku: `${name.replace(/\s+|\/|[^A-Za-z0-9]/g, "-").toUpperCase()}-${Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()}`,
      price: "",
      costPrice: "",
      discountPrice: "",
      stock: "0",
    }));
    replace(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinations]);

  /** Option group handlers */
  const addOptionGroup = () => {
    const name = newGroupName.trim();
    if (!name) return;
    setOptionGroups((prev) => [
      ...prev,
      { id: uid("g_"), name, values: [] as OptionValue[] },
    ]);
    setNewGroupName("");
  };

  const addValueToGroup = (groupId: string, valueRaw?: string) => {
    const value = (valueRaw ?? newGroupValue).trim();
    if (!value) return;
    setOptionGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              values: [...g.values, { id: uid("v_"), value }],
            }
          : g,
      ),
    );
    setNewGroupValue("");
  };

  const removeGroup = (groupId: string) =>
    setOptionGroups((p) => p.filter((g) => g.id !== groupId));

  const removeValue = (groupId: string, valueId: string) =>
    setOptionGroups((p) =>
      p.map((g) =>
        g.id === groupId
          ? { ...g, values: g.values.filter((v) => v.id !== valueId) }
          : g,
      ),
    );

  /** Save option groups (we already use them live to build combos) */
  const handleSaveOptions = () => {
    // perform a quick sanity check: groups must have values
    const bad = optionGroups.find((g) => g.values.length === 0);
    if (bad) {
      alert(`Please add option values for "${bad.name}" or remove the group.`);
      return;
    }
    if (optionGroups.length === 0) {
      alert("Add at least one option group.");
      return;
    }
    // combos will auto-generate via useEffect
  };

  /** Final submit: validate combos form and call onCreate with sanitized payload */
  const onSubmit = (payload: { combos: CombinationFormRow[] }) => {
    // convert numeric strings to numbers in final payload
    const cleaned = payload.combos.map((c) => ({
      name: c.name,
      sku: c.sku,
      price: Number(c.price),
      costPrice: c.costPrice ? Number(c.costPrice) : undefined,
      discountPrice: c.discountPrice ? Number(c.discountPrice) : undefined,
      stock: Number(c.stock),
    }));

    onCreate(payload.combos, optionGroups);
    setStep(1);
    // console.log("FINAL VARIANTS PAYLOAD:", cleaned);
    // onCreate(cleaned);
    // reset everything
    // setOptionGroups([]);
    // reset({ combos: [] });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center p-6 custon-scrollbar">
      {/* backdrop */}
      <div
        onClick={() => {
          setStep(1);
          onClose();
        }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="relative z-50 w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-auto max-h-[90vh]">
        <header className="flex items-center justify-between p-5 border-b relate">
          <div>
            <h2 className="text-lg font-semibold">Variant Builder</h2>
            <p className="text-sm text-gray-500">
              Add option groups (Color, Size) and their values, then fill each
              combination's details.
            </p>
          </div>
          <div className=" absolute top-4 right-4 flex items-center gap-2">
            {/* <button
              onClick={() => {
                // quick reset and close
                setOptionGroups([]);
                reset({ combos: [] });
                onClose();
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button> */}
            <button
              onClick={() => {
                // quick reset and close
                setOptionGroups([]);
                reset({ combos: [] });
                setStep(1);
                onClose();
              }}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 relative"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            {/* <button
              onClick={() => {
                // quick save & close
                handleSaveOptions();
                // fallback close handled by user after adding combos
              }}
              className="ml-2 inline-flex items-center gap-2 px-3 py-2 bg-purple-600 text-white text-sm rounded"
            >
              <Check className="w-4 h-4" /> Save options
            </button> */}
          </div>
        </header>

        {step === 1 && (
          <div className="p-5 space-y-6 bg-gray-50 ">
            {/* 1️⃣ Add new Option Group */}
            <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4">
              <div className="md:flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-purple-600" /> Add Option Group
                </h3>
                <p className="text-sm text-gray-500 ml-7 md:ml-0">
                  Define variant types and values.
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Option type (e.g. Color, Size)"
                  className="flex-1 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 rounded-lg px-3.5 py-2 text-gray-800 placeholder-gray-400 transition-all bg-gray-50"
                />
                <button
                  onClick={addOptionGroup}
                  className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white rounded-lg px-4 py-2.5 hover:bg-purple-700 active:scale-[0.97] transition-all"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </section>

            {/* 2️⃣ Existing Option Groups */}
            <section className="space-y-4">
              {optionGroups.length === 0 ? (
                <div className="text-sm text-gray-500 border border-dashed rounded-xl py-10 text-center bg-white">
                  <div className="flex flex-col items-center gap-2">
                    <Plus className="w-6 h-6 text-gray-400" />
                    <p>No option groups yet. Start by adding one above.</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 ">
                  {optionGroups.map((g) => (
                    <div
                      key={g.id}
                      className="border border-gray-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800">
                            {g.name}
                          </h4>
                          <button
                            onClick={() => removeGroup(g.id)}
                            className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md transition-colors"
                          >
                            <Trash className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>

                        <div className="mt-3">
                          {g.values.length > 0 ? (
                            <div className="mt-3 overflow-x-auto pb-1 custon-scrollbar">
                              <div className="flex flex-nowrap gap-2 min-w-max">
                                {g.values.map((v) => (
                                  <span
                                    key={v.id}
                                    className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-2.5 py-1 text-xs font-medium flex-shrink-0"
                                  >
                                    {v.value}
                                    <button
                                      onClick={() => removeValue(g.id, v.id)}
                                      className="text-purple-400 hover:text-red-500 transition-colors"
                                      title="Remove value"
                                      type="button"
                                    >
                                      <Trash className="w-3 h-3" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400 italic">
                              No values yet.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Add value input */}
                      <div className="mt-4 flex gap-2 w-full">
                        <input
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addValueToGroup(g.id);
                            }
                          }}
                          value={newGroupValue}
                          onChange={(e) => setNewGroupValue(e.target.value)}
                          placeholder={`Add ${g.name} value`}
                          className="flex-1 border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-100 rounded-lg px-3 py-2 text-sm placeholder-gray-400 transition-all bg-gray-50"
                        />
                        <button
                          onClick={() => addValueToGroup(g.id)}
                          className="inline-flex items-center justify-center gap-1.5 bg-gray-600 text-white rounded-lg px-3 py-2 text-sm hover:bg-gray-700 active:scale-[0.97] transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    // reset combos to initial default rows
                    replace(
                      combinations.map((name) => ({
                        name,
                        sku: `${name
                          .replace(/\s+|\/|[^A-Za-z0-9]/g, "-")
                          .toUpperCase()}-${Math.random()
                          .toString(36)
                          .substring(2, 6)
                          .toUpperCase()}`,
                        price: "",
                        costPrice: "",
                        discountPrice: "",
                        stock: "0",
                      })),
                    );
                    setStep(1);
                    onClose();
                  }}
                  className="px-3 py-2 border rounded text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                >
                  Next
                </button>
              </div>
            </section>
          </div>
        )}

        {step === 2 && (
          <div className="p-6 space-y-6">
            <p
              className="underline cursor-pointer text-purple-600 hover:text-purple-700 transition-colors"
              onClick={() => setStep(1)}
            >
              ← Back
            </p>

            {/* <section className="space-y-3">
              <div>
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-600" />
                  Generated Combinations
                </h3>
                <p className="text-sm text-gray-500">
                  These combinations are automatically generated from your
                  option groups.
                </p>
              </div>

              <div className="mt-2">
                {combinations.length === 0 ? (
                  <div className="text-sm text-gray-500 border border-dashed rounded-xl py-4 text-center bg-gray-50">
                    No combinations yet. Add option groups and values to
                    generate them.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {combinations.map((c, i) => (
                      <div
                        key={c}
                        className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 border border-gray-200 rounded-xl px-3.5 py-2.5 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-semibold text-sm">
                          {i + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {c}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            Auto-generated variant name
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section> */}

            {/* 4) Form for each combination (zod + rhf) */}
            <section className="space-y-3">
              <h3 className="font-medium">Fill Combination Details</h3>
              <p className="text-sm text-gray-500">
                Provide pricing and stock for each combination.
              </p>

              {fields.length === 0 ? (
                <div className="text-sm text-gray-500">No rows to fill.</div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-3">
                    {fields.map((f, idx) => {
                      const namePath = `combos.${idx}.name` as const;
                      const skuPath = `combos.${idx}.sku` as const;
                      const pricePath = `combos.${idx}.price` as const;
                      const costPath = `combos.${idx}.costPrice` as const;
                      const discountPath =
                        `combos.${idx}.discountPrice` as const;
                      const stockPath = `combos.${idx}.stock` as const;

                      return (
                        <div
                          key={f.id}
                          className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center bg-white border rounded p-3"
                        >
                          <div className="md:col-span-2">
                            <label className="text-sm text-gray-600">
                              Name
                            </label>
                            <input
                              {...register(namePath)}
                              readOnly
                              className="mt-1 w-full border rounded px-2 py-1 bg-gray-50"
                            />
                          </div>

                          {/* <div className="md:col-span-1">
                            <label className="text-sm text-gray-600">SKU</label>
                            <input
                              {...register(skuPath)}
                              readOnly
                              className="mt-1 w-full border rounded px-2 py-1 bg-gray-50"
                            />
                          </div> */}

                          <div className="md:col-span-1">
                            <label className="text-sm text-gray-600">
                              Price
                            </label>
                            <input
                              {...register(pricePath)}
                              className="mt-1 w-full border rounded px-2 py-1"
                              placeholder="0"
                            />
                          </div>

                          <div className="md:col-span-1">
                            <label className="text-sm text-gray-600">
                              Cost Price
                            </label>
                            <input
                              {...register(costPath)}
                              className="mt-1 w-full border rounded px-2 py-1"
                              placeholder="0"
                            />
                          </div>

                          <div className="md:col-span-1">
                            <label className="text-sm text-gray-600">
                              Discount Price{" "}
                            </label>
                            <input
                              {...register(discountPath)}
                              className="mt-1 w-full border rounded px-2 py-1"
                              placeholder="0 (optional)"
                            />
                          </div>

                          <div className="md:col-span-1">
                            <label className="text-sm text-gray-600">
                              Stock
                            </label>
                            <input
                              {...register(stockPath)}
                              className="mt-1 w-full border rounded px-2 py-1"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* show validation errors if any */}
                  {errors?.combos && (
                    <div className="text-sm text-red-600">
                      {(errors.combos as any).message || "Please fix errors"}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-3 border-t">
                    <button
                      type="button"
                      onClick={() => {
                        // reset combos to initial default rows
                        replace(
                          combinations.map((name) => ({
                            name,
                            sku: `${name
                              .replace(/\s+|\/|[^A-Za-z0-9]/g, "-")
                              .toUpperCase()}-${Math.random()
                              .toString(36)
                              .substring(2, 6)
                              .toUpperCase()}`,
                            price: "",
                            costPrice: "",
                            discountPrice: "",
                            stock: "0",
                          })),
                        );
                        setStep(1);
                      }}
                      className="px-3 py-2 border rounded text-sm"
                    >
                      Reset
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded"
                    >
                      Create Variants
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
