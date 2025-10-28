// CreateProduct.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Trash,
  ImageIcon,
  FolderPlus,
  Tag,
  BadgeCheck,
  Layers,
  Pencil,
  ArrowLeft,
} from "lucide-react";
import ReactQuill from "react-quill";
import VariantBuilder, {
  CombinationFormRow,
  OptionGroup,
} from "../components/onboarding/VariantBuilder";
import CreateCollectionModal from "../components/edit-product/CreateCollectionModal";
import { useFetchSingleProduct, useUpdateProduct } from "../lib/api/products";
import { useNavigate, useParams } from "react-router-dom";
import { getDecodedJwt } from "../lib/auth";
import { CreateProductPayload } from "../lib/types/products";
import { toast } from "sonner"; // or your preferred toast lib

const variantSchema = z.object({
  name: z
    .string()
    .min(1, "Combination name is required")
    .describe("Auto-generated name like 'Red / Small'"),

  sku: z
    .string()
    .optional()
    .describe("Unique SKU for this specific variant combination"),

  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price (e.g. 1000 or 1000.50)")
    .optional(),

  costPrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid cost price (e.g. 800 or 800.00)")
    .optional(),

  discountPrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid discount price")
    .optional(),

  stock: z
    .string()
    .regex(/^\d+$/, "Stock must be a valid whole number")
    .optional(),
});

export const optionValueSchema = z.object({
  id: z.string().min(1, "Value ID is required"),
  value: z.string().min(1, "Value name is required"),
});

export const optionGroupSchema = z.object({
  id: z.string().min(1, "Group ID is required"),
  name: z.string().min(1, "Group name is required"),
  values: z
    .array(optionValueSchema)
    .min(1, "Each option group must have at least one value"),
});

export const productSchema = z
  .object({
    images: z.array(z.instanceof(File)).max(8).optional(),
    name: z.string().min(2, "Product name is required"),
    sku: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    collection: z.string().optional(),
    hasVariations: z.boolean(),
    variants: z.array(variantSchema).optional(),
    variantsOptionGroup: z.array(optionGroupSchema).optional(),
    // Pricing and inventory
    price: z.string().optional(),
    costPrice: z.string().optional(),
    discountPrice: z.string().optional(),
    totalStock: z.string().optional(),

    // Others
    location: z.string().min(1, "Location is required"),
    unit: z.string().min(1, "Unit is required"),
  })
  .superRefine((data, ctx) => {
    if (data.hasVariations) {
      // ✅ Must have at least one variant
      if (!data.variants || data.variants.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "At least one variant is required when variations are enabled.",
          path: ["variants"],
        });
      }
      if (!data.variantsOptionGroup || data.variantsOptionGroup.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "At least one variant option is required when variations are enabled.",
          path: ["variantsOptionGroup"],
        });
      }
    } else {
      // ✅ Must have pricing and stock fields when no variations
      if (!data.price || data.price.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Retail Price is required.",
          path: ["price"],
        });
      }

      if (!data.costPrice || data.costPrice.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cost price is required.",
          path: ["costPrice"],
        });
      }

      if (!data.totalStock || data.totalStock.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Total stock is required.",
          path: ["totalStock"],
        });
      }
    }
  });

type ProductForm = z.infer<typeof productSchema>;

async function convertUrlsToFiles(urls: string[]): Promise<File[]> {
  const files = await Promise.all(
    urls.map(async (url, index) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split("/").pop() || `image-${index}.jpg`;
      return new File([blob], filename, { type: blob.type });
    }),
  );
  return files;
}

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
  const [variantModalOpen, setVariantModalOpen] = useState(false);

  const { id } = useParams();

  const user = getDecodedJwt();
  const userId = user?.id;
  const {
    data: productDetails,
    isLoading,
    // error: productDetailsError,
  } = useFetchSingleProduct(userId, id as string);

  const { mutateAsync: updateProduct, isPending } = useUpdateProduct();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: undefined, // Start undefined, set when loaded
  });

  useEffect(() => {
    const mapProductToForm = async () => {
      if (productDetails) {
        const imageFiles = productDetails.images
          ? await convertUrlsToFiles(productDetails.images)
          : [];

        setFiles(imageFiles);

        setPreviews(imageFiles.map((f) => URL.createObjectURL(f)));

        // Map API response to match form schema
        const mappedDefaults: ProductForm = {
          name: productDetails.name || "",
          sku: productDetails.sku || "",
          description: productDetails.description || "",
          collection: productDetails.collection || "",
          hasVariations: !!productDetails.variations?.length,
          variants:
            productDetails.variations?.map((v) => ({
              name: v.name || "",
              sku: v.sku || "",
              price: v.price?.toString() || "",
              costPrice: v.costPrice?.toString() || "",
              ...(v.discountPrice
                ? { discountPrice: v.discountPrice?.toString() || "" }
                : {}),
              stock: v.stock?.toString() || "",
            })) || [],
          variantsOptionGroup: productDetails.variantsOptionGroup || [],
          price: productDetails.price?.toString() || "",
          costPrice: productDetails.costPrice?.toString() || "",
          discountPrice: productDetails.discountPrice?.toString() || "",
          totalStock: productDetails.totalStock?.toString() || "",
          location: productDetails.location || "",
          unit: productDetails.unit || "",
          ...(imageFiles ? { images: imageFiles } : {}),
        };

        reset(mappedDefaults);
      }
    };
    mapProductToForm();
  }, [productDetails, reset]);

  // images handling
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const hasVariations = watch("hasVariations");
  const variants = watch("variants") || [];
  const variantsOptionGroup = watch("variantsOptionGroup") || [];
  const priceVal = watch("price") || "";
  const costPriceVal = watch("costPrice") || "";
  // const discountedVal = watch("discountPrice") || "";

  // variants array management
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants" as any,
  });

  const MAX_FILE_SIZE_MB = 2;
  const MAX_TOTAL_SIZE_MB = 8;

  function onDropFiles(fileList: FileList | null) {
    setErrorMessage(null);
    if (!fileList) return;

    const newFiles = Array.from(fileList);

    // Calculate total size including previously added files
    const totalSize =
      newFiles.reduce((sum, f) => sum + f.size, 0) +
      files.reduce((sum, f) => sum + f.size, 0);

    // --- 1️⃣ Check individual file size
    const tooLargeFiles = newFiles.filter(
      (f) => f.size > MAX_FILE_SIZE_MB * 1024 * 1024,
    );

    if (tooLargeFiles.length > 0) {
      setErrorMessage(
        `❌ ${tooLargeFiles.length} file(s) exceed max of ${MAX_FILE_SIZE_MB}MB each.`,
      );
      return;
    }

    // --- 2️⃣ Check total combined size
    if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
      setErrorMessage(
        `❌ Total image size cannot exceed max of ${MAX_TOTAL_SIZE_MB}MB.`,
      );
      return;
    }

    // --- 3️⃣ Check count limit (optional)
    if (files.length + newFiles.length > 4) {
      setErrorMessage("❌ You can upload a maximum of 4 images.");
      return;
    }

    // --- 4️⃣ Add new files and previews
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }

  const handleFileRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newFiles.map((f) => URL.createObjectURL(f)));
    setValue("images", newFiles as any);
  };

  const onCreateCollection = (col: {
    id: string;
    name: string;
    image?: string;
  }) => {
    setCollections((prev) => [...prev, col]);
    setValue("collection", col.name);
  };
  const onCreateVariant = (
    variants: CombinationFormRow[],
    optionGroups: OptionGroup[],
  ) => {
    // Filter out any variant that has an empty discountPrice
    const cleanedVariants = variants.map((v) => {
      const { discountPrice, ...rest } = v;
      return discountPrice === "" ? rest : v;
    });

    setValue("variants", cleanedVariants);

    setValue("variantsOptionGroup", optionGroups);
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

  // const { mutate: createProductMutation, isPending } = useCreateProduct();

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    // 🧩 Normalize all numeric & currency fields
    const normalizeCurrency = (val?: string) =>
      val && val.trim() !== "" ? Number(unformatCurrency(val)) : undefined;

    const normalizeNumber = (val?: string) =>
      val && val.trim() !== "" ? Number(val.replace(/\D/g, "")) : 0;

    // 🧠 Normalize and clean variations
    const normalizedVariations = data.variants
      ?.map((v) => {
        const variation = {
          ...v,
          price: normalizeCurrency(v.price),
          costPrice: normalizeCurrency(v.costPrice),
          discountPrice: v.discountPrice?.trim()
            ? normalizeCurrency(v.discountPrice)
            : undefined,
          stock: normalizeNumber(v.stock),
        };

        // 🧹 Remove discountPrice key if empty or undefined
        if (
          v.discountPrice === "" ||
          v.discountPrice == null ||
          v.discountPrice.trim?.() === ""
        ) {
          delete variation.discountPrice;
        }

        return variation;
      })
      // 🧹 Remove any variations that have no name or invalid price
      .filter((v) => v.name?.trim() && v.price !== undefined);

    const normalized = {
      ...data,
      price: normalizeCurrency(data.price),
      costPrice: normalizeCurrency(data.costPrice),
      discountPrice: normalizeCurrency(data.discountPrice),
      totalStock: normalizeNumber(data.totalStock),
      variations: normalizedVariations,
      variantsOptionGroup: data.variantsOptionGroup,
      ...{ images: files && files.length > 0 ? files : undefined }, // only include if not empty
    };

    // 🧹 Clean up unused or invalid fields
    const cleaned: Record<string, any> = { ...normalized };
    delete cleaned.hasVariations;
    delete cleaned.variants; // always remove old local state array

    if (!data.hasVariations) {
      // simple product
      delete cleaned.variations;
      delete cleaned.variantsOptionGroup;
    } else {
      // variant product
      delete cleaned.price;
      delete cleaned.costPrice;
      delete cleaned.totalStock;
    }

    // Remove empty discountPrice (for non-variant products)
    if (
      !data.discountPrice ||
      data.discountPrice.trim() === "" ||
      data.hasVariations
    ) {
      delete cleaned.discountPrice;
    }

    // Remove empty collection
    if (!data.collection?.trim()) delete cleaned.collection;

    console.log("SUBMIT:", cleaned);

    await updateProduct({
      productId: id as string,
      payload: cleaned as CreateProductPayload,
    });
    navigate(`/products/${id}`);
  };

  const name = watch("name");

  useEffect(() => {
    if (name) {
      const prefix = name
        .replace(/[^a-zA-Z0-9 ]/g, "") // remove special chars
        .split(" ") // split words
        .slice(0, 3) // take first 3 words
        .map((word) => word.slice(0, 2).toUpperCase()) // take first 2 letters of each
        .join(""); // join them

      const random = Math.random().toString(36).substring(2, 7).toUpperCase();
      setValue("sku", `${prefix}-${random}`);
    } else {
      setValue("sku", "");
    }
  }, [name, setValue]);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex items-center  mb-4">
          <button
            onClick={() => navigate(`/products/${id}`)}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 relative mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold">Edit Product</h1>
        </div>

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
                    "product-files",
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
                    <div className="text-sm  ">PNG, JPG. Max 4 images</div>
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

              {errorMessage && (
                <div className="my-4 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg">
                  {errorMessage}
                </div>
              )}

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
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  className="mt-1 block w-full border rounded px-3 py-2"
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SKU
                </label>
                <input
                  {...register("sku")}
                  className="mt-1 block w-full border rounded px-3 py-2 bg-gray-50"
                  readOnly
                />
              </div>
            </div>

            <div className="mt-4">
              {/*  */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                    className="h-60 mb-12"
                    placeholder="Write about your product..."
                  />
                )}
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
                    {...register("collection")}
                    className="block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="">— Select collection —</option>
                    {collections.map((c) => (
                      <option key={c.id} value={c.name}>
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
                    {variants.length === 0 ? (
                      <button
                        type="button"
                        onClick={() => setVariantModalOpen(true)}
                        className="text-sm px-3 py-1 bg-gray-100 rounded flex items-center space-x-2"
                      >
                        <Plus size={14} /> Add variant
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setVariantModalOpen(true)}
                        className="text-sm px-3 py-1 border border-purple-600 text-purple-600 rounded flex items-center space-x-2"
                      >
                        <Pencil size={14} className="mr-2" /> Edit variant
                      </button>
                    )}
                  </div>

                  {fields.length === 0 && (
                    <div className="">
                      <p className="text-sm text-gray-500 mb-2">
                        No variants yet — add one.
                      </p>
                      {errors.variants && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.variants.message}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* 🟪 Option Groups Section */}
                    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
                      <div className="flex items-center justify-between border-b px-4 py-3">
                        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-gray-500" />
                          Option Groups
                        </h3>
                        <span className="text-xs text-gray-500">
                          {variantsOptionGroup.length} group
                          {variantsOptionGroup.length !== 1 && "s"}
                        </span>
                      </div>

                      <div className="p-4">
                        {variantsOptionGroup.length === 0 ? (
                          <div className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                            No option groups added yet.
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {variantsOptionGroup.map((group: any) => (
                              <div
                                key={group.id}
                                className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium text-gray-800">
                                    {group.name}
                                  </h4>
                                  <span className="text-xs text-gray-400">
                                    {group.values?.length} value
                                    {group.values?.length !== 1 && "s"}
                                  </span>
                                </div>
                                <div className="flex overflow-x-auto gap-2 pb-1">
                                  {group.values?.map((v: any) => (
                                    <span
                                      key={v.id}
                                      className="whitespace-nowrap inline-flex items-center bg-white text-gray-700 border border-gray-200 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm"
                                    >
                                      {v.value}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </section>

                    {/* 🟩 Variant Combinations Section */}
                    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
                      <div className="flex items-center justify-between border-b px-4 py-3">
                        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          <BadgeCheck className="w-4 h-4 text-gray-500" />
                          Variant Combinations
                        </h3>
                        <span className="text-xs text-gray-500">
                          {variants.length} combination
                          {variants.length !== 1 && "s"}
                        </span>
                      </div>

                      <div className="p-4">
                        {variants.length === 0 ? (
                          <div className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                            No variant combinations generated yet.
                          </div>
                        ) : (
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {variants.map((variant: any, i: number) => (
                              <div
                                key={variant.name + i}
                                className="rounded-lg border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100 transition"
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-800 flex items-center gap-1">
                                    <Tag className="w-4 h-4 text-gray-400" />
                                    {variant.name}
                                  </h4>
                                  <span className="text-xs text-gray-400">
                                    #{i + 1}
                                  </span>
                                </div>

                                <div className="mt-2 text-xs sm:text-sm text-gray-700 space-y-1">
                                  <p>
                                    <span className="font-medium">Price:</span>{" "}
                                    {variant.price || "—"}
                                  </p>
                                  <p>
                                    <span className="font-medium">Stock:</span>{" "}
                                    {variant.stock || "—"}
                                  </p>
                                  {variant.discountPrice && (
                                    <p>
                                      <span className="font-medium">
                                        Discount:
                                      </span>{" "}
                                      {variant.discountPrice}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </section>
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
                          Retails Price
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
                        {errors.price && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.price.message}
                          </p>
                        )}
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
                        {errors.costPrice && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.costPrice.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="discountPrice"
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
                        {errors.discountPrice && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.discountPrice.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              )}
            </div>

            {!hasVariations && (
              <p className="text-sm text-gray-500 mt-6">
                Profit:{" "}
                <span className="font-semibold">
                  ₦{formatCurrency(String(profit)) || "0"}
                </span>
              </p>
            )}
            {hasVariations && (
              <p
                className="text-sm text-purple-500 mt-6 cursor-pointer "
                onClick={() => {
                  setValue("variants", []);
                  setValue("variantsOptionGroup", []);
                }}
              >
                Reset Variations
              </p>
            )}
          </section>

          {/* Inventory */}
          <section className="border rounded-lg p-4">
            <h2 className="font-semibold mb-3">Inventory</h2>

            <div className="grid md:grid-cols-3 gap-4">
              {!hasVariations && (
                <Controller
                  control={control}
                  name="totalStock"
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
                      {errors.totalStock && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.totalStock.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              )}

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
                <label className="block text-sm text-gray-700">Unit</label>
                <input
                  {...register("unit")}
                  className="mt-1 block w-full border rounded px-3 py-2"
                  placeholder="e.g., piece, pack"
                />
                {errors.unit && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.unit.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div></div>

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
                disabled={isPending}
                className="py-3 px-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Saving Product..." : "Save Product"}
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
      <VariantBuilder
        open={variantModalOpen}
        onClose={() => setVariantModalOpen(false)}
        onCreate={onCreateVariant}
      />
    </div>
  );
}
