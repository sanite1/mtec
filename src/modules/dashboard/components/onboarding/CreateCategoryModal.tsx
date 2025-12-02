import { ImageIcon } from "lucide-react";
import { useState } from "react";

/**
 * Category Modal component
 */
export default function CreateCategoryModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (category: { id: string; name: string; image?: string }) => void;
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (f?: File) => {
    if (!f) return;
    setFile(f);
    console.log(file);

    setPreview(URL.createObjectURL(f));
  };

  const create = () => {
    if (!name.trim()) {
      alert("Please enter category name");
      return;
    }
    const id = `col_${Date.now()}`;
    onCreate({ id, name: name.trim(), image: preview || undefined });
    setName("");
    setDesc("");
    setPreview(null);
    setFile(null);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Create Category</h3>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Category Image
          </label>
          <div
            className="flex items-center gap-3 border-dashed border-2 border-gray-200 rounded-md p-3 cursor-pointer"
            onClick={() => {
              const el = document.getElementById(
                "col-file",
              ) as HTMLInputElement;
              el?.click();
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center rounded bg-gray-50 border">
                <ImageIcon />
              </div>
            )}
            <div className="text-sm text-gray-600">
              Click to upload or drag file here
            </div>
            <input
              id="col-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-4 py-2 rounded border">
              Cancel
            </button>
            <button
              onClick={create}
              className="px-4 py-2 rounded bg-purple-600 text-white"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
