// CreateProduct.tsx
import React, { useCallback, useMemo, useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash, ImageIcon, FolderPlus } from "lucide-react";
import CreateCollectionModal from "./CreateCollectionModal";

/**
 * Types & Schema
 */
const currencyRegex = /^[0-9,]*$/;

const variantSchema = z.object({
  title: z.string().min(1),
  price: z.string().min(1),
  costPrice: z.string().optional(),
  sku: z.string().optional(),
  quantity: z.string().optional(),
  attributes: z.record(z.string(), z.string()).optional(), // attributeName -> option
});

const productSchema = z.object({
  images: z.array(z.instanceof(File)).max(8).optional(),
  name: z.string().min(2, "Product name required"),
  shortDescription: z.string().min(1).optional(),
  description: z.string().min(1, "Description is required"),
  collectionId: z.string().optional(),
  hasVariations: z.boolean(),
  // If hasVariations true: variants
  variants: z.array(variantSchema).optional(),
  // If no variations:
  price: z.string().optional(),
  costPrice: z.string().optional(),
  discountedPrice: z.string().optional(),
  // inventory:
  stockQuantity: z.string().min(1, "Stock is required"),
  location: z.string(),
  unit: z.string().optional(),
});

type ProductForm = z.infer<typeof productSchema>;

/**
 * Helpers
 */
const formatCurrency = (value?: string) => {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("en-NG").format(Number(digits));
};
const unformatCurrency = (formatted?: string) =>
  (formatted || "").replace(/[^\d]/g, "");

function bytesToSize(bytes: number) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}

/**
 * Main Create Product component
 */
export default function CreateProduct() {
  // local collections state (would come from backend in real app)
  const [collections, setCollections] = useState<
    { id: string; name: string; image?: string }[]
  >([]);
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      hasVariations: false,
      location: "headquarters",
      stockQuantity: "0",
    },
  });

  // images handling
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const hasVariations = watch("hasVariations");
  const priceVal = watch("price") || "";
  const costPriceVal = watch("costPrice") || "";
  const discountedVal = watch("discountedPrice") || "";

  // variants array management
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants" as any,
  });

  const onDropFiles = useCallback(
    (incomingFiles: FileList | null) => {
      if (!incomingFiles) return;
      const arr = Array.from(incomingFiles);
      const newFiles = [...files, ...arr].slice(0, 8); // limit 8
      setFiles(newFiles);
      setPreviews(newFiles.map((f) => URL.createObjectURL(f)));
      // set to react-hook-form as well
      setValue("images", newFiles as any);
    },
    [files, setValue]
  );

  const handleFileRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newFiles.map((f) => URL.createObjectURL(f)));
    setValue("images", newFiles as any);
  };

  const addVariant = () =>
    append({
      title: "",
      price: "",
      costPrice: "",
      sku: "",
      quantity: "1",
      attributes: {},
    });

  const onCreateCollection = (col: {
    id: string;
    name: string;
    image?: string;
  }) => {
    setCollections((prev) => [...prev, col]);
    setValue("collectionId", col.id);
  };

  const parsedNumber = (val?: string) => {
    const raw = unformatCurrency(val);
    return raw ? Number(raw) : 0;
  };

  // profit when not variations: price - cost
  const profit = useMemo(() => {
    const p = parsedNumber(priceVal);
    const c = parsedNumber(costPriceVal);
    return p - c;
  }, [priceVal, costPriceVal]);

  const onSubmit: SubmitHandler<ProductForm> = (data) => {
    // Normalize currency fields to raw numbers before logging/sending to backend
    const normalized = {
      ...data,
      price: data.price ? Number(unformatCurrency(data.price)) : undefined,
      costPrice: data.costPrice
        ? Number(unformatCurrency(data.costPrice))
        : undefined,
      discountedPrice: data.discountedPrice
        ? Number(unformatCurrency(data.discountedPrice))
        : undefined,
      stockQuantity: Number((data.stockQuantity || "0").replace(/\D/g, "")),
      variants: data.variants
        ? data.variants.map((v) => ({
            ...v,
            price: Number(unformatCurrency(v.price)),
            costPrice: v.costPrice
              ? Number(unformatCurrency(v.costPrice))
              : undefined,
            quantity: v.quantity ? Number(unformatCurrency(v.quantity)) : 0,
          }))
        : undefined,
      images: files, // actual File objects
    };

    console.log("SUBMIT:", normalized);
    alert("Product data logged to console (see SUBMIT).");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Create Product</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Images */}
          <section className="border rounded-lg p-4">
            <h2 className="font-semibold mb-2">Product Images</h2>
            <p className="text-sm text-gray-500 mb-3">
              Drag & drop or click to upload (up to 8)
            </p>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onDropFiles(e.dataTransfer.files);
              }}
            >
              <div
                className="border-dashed cursor-pointer border-2 text-gray-400 border-gray-200 hover:border-black hover:text-black rounded-md p-6 flex items-center justify-between gap-4"
                onClick={() => {
                  const el = document.getElementById(
                    "product-files"
                  ) as HTMLInputElement;
                  el?.click();
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center ">
                    <ImageIcon />
                  </div>
                  <div>
                    <div className="font-medium text-black">Upload images</div>
                    <div className="text-sm  ">PNG, JPG. Max 8 images</div>
                  </div>
                </div>

                <input
                  id="product-files"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => onDropFiles(e.target.files)}
                />
                <div className="text-sm ">Click to select</div>
              </div>

              {/* previews */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {previews.map((src, i) => (
                  <div
                    key={i}
                    className="relative rounded overflow-hidden border"
                  >
                    <img
                      src={src}
                      alt={`preview-${i}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleFileRemove(i)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                      title="Remove"
                    >
                      <Trash size={14} />
                    </button>
                    <div className="absolute left-1 bottom-1 bg-black/50 text-white px-2 py-0.5 text-xs rounded">
                      {files[i] ? bytesToSize(files[i].size) : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Product Details */}
          <section className="border rounded-lg p-4">
            <h2 className="font-semibold mb-3">Product Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product name
                </label>
                <input
                  {...register("name")}
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Short description
                </label>
                <input
                  {...register("shortDescription")}
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Product description
              </label>

              {/* simple rich-ish editor toolbar */}
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(
                      "desc"
                    ) as HTMLTextAreaElement;
                    if (!el) return;
                    const cur = el.value;
                    el.value = cur + "\n• ";
                    el.focus();
                  }}
                  className="px-2 py-1 rounded bg-gray-100 text-sm"
                >
                  • Bullet
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(
                      "desc"
                    ) as HTMLTextAreaElement;
                    if (!el) return;
                    const cur = el.value;
                    el.value = cur + " **bold** ";
                    el.focus();
                  }}
                  className="px-2 py-1 rounded bg-gray-100 text-sm"
                >
                  Bold
                </button>
              </div>

              <textarea
                id="desc"
                {...register("description")}
                rows={6}
                className="mt-2 w-full border rounded px-3 py-2"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-6 items-start">
              {/* Collection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Collection
                </label>
                <div className="mt-1 flex gap-2">
                  <select
                    {...register("collectionId")}
                    className="block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="">— Select collection —</option>
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setCollectionModalOpen(true)}
                    className="px-3 py-2 bg-purple-50 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-100 transition flex items-center gap-1"
                  >
                    <FolderPlus size={16} />
                    <span className="hidden sm:inline text-sm">New</span>
                  </button>
                </div>
              </div>

              {/* Variations */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Has variations?
                </label>
                <div className="mt-2 flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={hasVariations === true}
                      onChange={() => setValue("hasVariations", true)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={hasVariations === false}
                      onChange={() => setValue("hasVariations", false)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Conditional Fields */}
            {hasVariations ? (
              <p className="italic text-sm mt-4">
                • Prices and quantity will be added in the variation section.
              </p>
            ) : (
              <></>
            )}

            {/* Pricing or Variants */}
            <div className="mt-4">
              {hasVariations ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Variants</h3>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="text-sm px-3 py-1 bg-gray-100 rounded flex items-center space-x-2"
                    >
                      <Plus size={14} /> Add variant
                    </button>
                  </div>

                  {fields.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No variants yet — add one.
                    </p>
                  )}

                  <div className="space-y-3">
                    {fields.map((f, idx) => (
                      <div
                        key={f.id}
                        className="border rounded p-3 flex flex-col md:flex-row gap-3 items-start"
                      >
                        <div className="flex-1 grid gap-2 md:grid-cols-2">
                          <input
                            placeholder="Variant title (e.g. Red - L)"
                            {...register(`variants.${idx}.title` as const)}
                            className="border rounded px-2 py-2"
                          />
                          <Controller
                            control={control}
                            name={`variants.${idx}.price` as const}
                            render={({ field }) => (
                              <input
                                {...field}
                                value={field.value}
                                onChange={(e) =>
                                  field.onChange(formatCurrency(e.target.value))
                                }
                                placeholder="Price (₦)"
                                className="border rounded px-2 py-2"
                              />
                            )}
                          />
                          <Controller
                            control={control}
                            name={`variants.${idx}.costPrice` as const}
                            render={({ field }) => (
                              <input
                                {...field}
                                value={field.value}
                                onChange={(e) =>
                                  field.onChange(formatCurrency(e.target.value))
                                }
                                placeholder="Cost Price (₦)"
                                className="border rounded px-2 py-2"
                              />
                            )}
                          />
                          <input
                            placeholder="Quantity"
                            {...register(`variants.${idx}.quantity` as const)}
                            className="border rounded px-2 py-2"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => remove(idx)}
                            className="px-3 py-1 bg-red-50 text-red-600 rounded border"
                          >
                            <Trash size={14} /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-3">
                  <Controller
                    control={control}
                    name="price"
                    render={({ field }) => (
                      <div>
                        <label className="block text-sm text-gray-700">
                          Price
                        </label>
                        <input
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(formatCurrency(e.target.value))
                          }
                          placeholder="0"
                          className="mt-1 block w-full border rounded px-3 py-2"
                        />
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="costPrice"
                    render={({ field }) => (
                      <div>
                        <label className="block text-sm text-gray-700">
                          Cost Price
                        </label>
                        <input
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(formatCurrency(e.target.value))
                          }
                          placeholder="0"
                          className="mt-1 block w-full border rounded px-3 py-2"
                        />
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="discountedPrice"
                    render={({ field }) => (
                      <div>
                        <label className="block text-sm text-gray-700">
                          Discounted Price (optional)
                        </label>
                        <input
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(formatCurrency(e.target.value))
                          }
                          placeholder="0"
                          className="mt-1 block w-full border rounded px-3 py-2"
                        />
                      </div>
                    )}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Inventory */}
          <section className="border rounded-lg p-4">
            <h2 className="font-semibold mb-3">Inventory</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <Controller
                control={control}
                name="stockQuantity"
                render={({ field }) => (
                  <div>
                    <label className="block text-sm text-gray-700">
                      Stock Quantity
                    </label>
                    <input
                      {...field}
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="0"
                      className="mt-1 block w-full border rounded px-3 py-2"
                    />
                    {errors.stockQuantity && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.stockQuantity.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <div>
                <label className="block text-sm text-gray-700">Location</label>
                <select
                  {...register("location")}
                  className="mt-1 block w-full border rounded px-3 py-2"
                >
                  <option value="headquarters">Headquarters</option>
                  {/* Could be made dynamic */}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700">
                  Unit (optional)
                </label>
                <input
                  {...register("unit")}
                  className="mt-1 block w-full border rounded px-3 py-2"
                  placeholder="e.g., piece, pack"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm text-gray-500">
                Profit:{" "}
                <span className="font-semibold">
                  ₦{formatCurrency(String(profit)) || "0"}
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => console.log("Preview not implemented")}
                className="px-4 py-2 border rounded"
              >
                Preview
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded"
              >
                Save Product
              </button>
            </div>
          </div>
        </form>
      </div>

      <CreateCollectionModal
        open={collectionModalOpen}
        onClose={() => setCollectionModalOpen(false)}
        onCreate={onCreateCollection}
      />
    </div>
  );
}
