'use client';

import { useRestaurant } from '@/hooks/restaurant';

export function SimpleRestaurantTest() {
  // Test with a dummy ID - this will show loading state
  const { data, isLoading, error } = useRestaurant('test-id');

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-2">React Query Test</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && <p>Data loaded successfully!</p>}
      <p className="text-sm text-gray-600">
        This component tests if React Query is properly configured.
      </p>
    </div>
  );
} 