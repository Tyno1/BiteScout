"use client";

import { Button } from "@/components/atoms";
import { AlertTriangle, Home, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-red-100 rounded-full">
            <Shield className="h-12 w-12 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You don&apos;t have permission to access this restaurant.
          </p>
        </div>

        {/* Message */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-yellow-800">
                Restaurant Access Required
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                Contact your restaurant administrator to request access or verify your permissions.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            text="Go to Dashboard"
            variant="solid"
            color="primary"
            fullWidth
            onClick={() => router.push("/dashboard")}
            IconBefore={<Home size={16} />}
          />
          
          <Button
            text="Go to Onboarding"
            variant="outline"
            color="neutral"
            fullWidth
            onClick={() => router.push("/onboarding/roles")}
          />
        </div>

        {/* Help Text */}
        <p className="text-xs text-muted-foreground">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
}