import { Loader2 } from "lucide-react";

export function Spinner() {
  return (
    <div data-testid="spinner-container" className="flex items-center justify-center p-4">
      <Loader2 className="animate-spin text-gray-600 h-6 w-6" />
    </div>
  );
}
