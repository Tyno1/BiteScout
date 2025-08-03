'use client';

import { 
  useAddDeliveryLink,
  useCreateRestaurant,
  useDeleteDeliveryLink,
  useDeliveryLinks,
  useRestaurant, 
  useRestaurantByOwner, 
  useRestaurantsByName,
  useUpdateRestaurant
} from '@/hooks/restaurant';
import { useState } from 'react';

// Example component showing how to use React Query hooks
export function RestaurantQueryExample() {
  const [restaurantId, setRestaurantId] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [searchName, setSearchName] = useState('');

  // Query hooks
  const { data: restaurant, isLoading: restaurantLoading, error: restaurantError } = useRestaurant(restaurantId);
  const { data: ownerRestaurant, isLoading: ownerLoading } = useRestaurantByOwner(ownerId);
  const { data: searchResults, isLoading: searchLoading } = useRestaurantsByName(searchName);
  const { data: deliveryLinks, isLoading: linksLoading } = useDeliveryLinks(restaurantId);

  // Mutation hooks
  const createRestaurantMutation = useCreateRestaurant();
  const updateRestaurantMutation = useUpdateRestaurant();
  const addDeliveryLinkMutation = useAddDeliveryLink();
  const deleteDeliveryLinkMutation = useDeleteDeliveryLink();

  const handleCreateRestaurant = () => {
    createRestaurantMutation.mutate({
      name: 'New Restaurant',
      description: 'A new restaurant',
      ownerId: 'example-owner-id', // Required field
      // ... other fields
    });
  };

  const handleUpdateRestaurant = () => {
    if (restaurantId) {
      updateRestaurantMutation.mutate({
        id: restaurantId,
        data: {
          name: 'Updated Restaurant Name',
          ownerId: 'example-owner-id', // Required field
          // ... other fields
        }
      });
    }
  };

  const handleAddDeliveryLink = () => {
    if (restaurantId) {
      addDeliveryLinkMutation.mutate({
        restaurantId,
        data: {
          platform: 'Uber Eats',
          url: 'https://ubereats.com/restaurant',
          isActive: true
        }
      });
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Restaurant Query Examples</h2>
      
      {/* Restaurant by ID */}
      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold">Get Restaurant by ID</h3>
        <input
          type="text"
          placeholder="Restaurant ID"
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        {restaurantLoading && <p>Loading restaurant...</p>}
        {restaurantError && <p className="text-red-500">Error: {restaurantError.message}</p>}
        {restaurant && (
          <div className="mt-2">
            <p><strong>Name:</strong> {restaurant.name}</p>
            <p><strong>Description:</strong> {restaurant.description}</p>
          </div>
        )}
      </div>

      {/* Restaurant by Owner */}
      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold">Get Restaurant by Owner</h3>
        <input
          type="text"
          placeholder="Owner ID"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        {ownerLoading && <p>Loading owner restaurant...</p>}
        {ownerRestaurant && (
          <div className="mt-2">
            <p><strong>Name:</strong> {ownerRestaurant.name}</p>
          </div>
        )}
      </div>

      {/* Search Restaurants */}
      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold">Search Restaurants</h3>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        {searchLoading && <p>Searching...</p>}
        {searchResults && (
          <div className="mt-2">
            <p><strong>Found {searchResults.length} restaurants:</strong></p>
            <ul className="list-disc pl-4">
              {searchResults.map((restaurant: any) => (
                <li key={restaurant._id}>{restaurant.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Delivery Links */}
      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold">Delivery Links</h3>
        {linksLoading && <p>Loading delivery links...</p>}
        {deliveryLinks && (
          <div className="mt-2">
            <p><strong>Delivery Links:</strong></p>
            <ul className="list-disc pl-4">
              {deliveryLinks.map((link) => (
                <li key={link._id}>
                  {link.platform} - {link.url}
                  <button
                    type="button"
                    onClick={() => deleteDeliveryLinkMutation.mutate({ 
                      restaurantId, 
                      linkId: link._id 
                    })}
                    className="ml-2 text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mutation Examples */}
      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold">Mutations</h3>
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleCreateRestaurant}
            disabled={createRestaurantMutation.isPending}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            {createRestaurantMutation.isPending ? 'Creating...' : 'Create Restaurant'}
          </button>
          
          <button
            type="button"
            onClick={handleUpdateRestaurant}
            disabled={updateRestaurantMutation.isPending || !restaurantId}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            {updateRestaurantMutation.isPending ? 'Updating...' : 'Update Restaurant'}
          </button>
          
          <button
            type="button"
            onClick={handleAddDeliveryLink}
            disabled={addDeliveryLinkMutation.isPending || !restaurantId}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            {addDeliveryLinkMutation.isPending ? 'Adding...' : 'Add Delivery Link'}
          </button>
        </div>
      </div>
    </div>
  );
} 