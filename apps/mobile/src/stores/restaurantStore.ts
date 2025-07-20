import { create } from 'zustand';

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  image: string;
  priceRange: string;
  isOpen: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image?: string;
}

interface RestaurantState {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  menuItems: MenuItem[];
  isLoading: boolean;
  searchQuery: string;
  setRestaurants: (restaurants: Restaurant[]) => void;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
  setMenuItems: (items: MenuItem[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  searchRestaurants: (query: string) => Promise<void>;
  getRestaurantById: (id: string) => Promise<Restaurant | null>;
}

export const useRestaurantStore = create<RestaurantState>((set, get) => ({
  restaurants: [],
  selectedRestaurant: null,
  menuItems: [],
  isLoading: false,
  searchQuery: '',

  setRestaurants: (restaurants: Restaurant[]) => {
    set({ restaurants });
  },

  setSelectedRestaurant: (restaurant: Restaurant | null) => {
    set({ selectedRestaurant: restaurant });
  },

  setMenuItems: (items: MenuItem[]) => {
    set({ menuItems: items });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  searchRestaurants: async (query: string) => {
    set({ isLoading: true, searchQuery: query });
    try {
      // TODO: Implement actual API call
      // const response = await restaurantService.search(query);
      
      // Mock data
      const mockRestaurants: Restaurant[] = [
        {
          id: '1',
          name: 'Italian Delight',
          cuisine: 'Italian',
          rating: 4.5,
          distance: '0.5km',
          address: '123 Main Street, City',
          phone: '+1 234 567 8900',
          hours: 'Open 11:00 AM - 10:00 PM',
          description: 'Authentic Italian cuisine with fresh ingredients.',
          image: 'https://via.placeholder.com/400x200',
          priceRange: '$$',
          isOpen: true,
        },
        {
          id: '2',
          name: 'Sushi Master',
          cuisine: 'Japanese',
          rating: 4.8,
          distance: '1.2km',
          address: '456 Oak Avenue, City',
          phone: '+1 234 567 8901',
          hours: 'Open 12:00 PM - 11:00 PM',
          description: 'Fresh sushi and traditional Japanese dishes.',
          image: 'https://via.placeholder.com/400x200',
          priceRange: '$$$',
          isOpen: true,
        },
      ];
      
      set({ restaurants: mockRestaurants, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  getRestaurantById: async (id: string) => {
    set({ isLoading: true });
    try {
      // TODO: Implement actual API call
      // const response = await restaurantService.getById(id);
      
      // Mock data
      const mockRestaurant: Restaurant = {
        id,
        name: 'Sample Restaurant',
        cuisine: 'Italian',
        rating: 4.5,
        distance: '0.5km',
        address: '123 Main Street, City',
        phone: '+1 234 567 8900',
        hours: 'Open 11:00 AM - 10:00 PM',
        description: 'Authentic Italian cuisine with fresh ingredients and traditional recipes.',
        image: 'https://via.placeholder.com/400x200',
        priceRange: '$$',
        isOpen: true,
      };
      
      set({ selectedRestaurant: mockRestaurant, isLoading: false });
      return mockRestaurant;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
})); 