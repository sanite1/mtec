import { ArrowLeft } from "lucide-react";

export function StorefrontSettingsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center">
        <button className="p-2 rounded bg-gray-100 mr-3">
          <ArrowLeft className="w-6 h-6 text-gray-400" />
        </button>
        <div className="h-6 w-48 bg-gray-200 rounded"></div>
      </div>

      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="h-5 w-40 bg-gray-200 rounded"></div>

          <div className="flex items-center justify-between">
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-56 bg-gray-100 rounded"></div>
            </div>

            <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
