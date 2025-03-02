// models/RestaurantData.d.ts
declare module "../models/RestaurantData.js" {
  const RestaurantData: {
    create: (data: any) => Promise<any>;
    findById: (id: string) => Promise<any>;
    find: () => Promise<any[]>;
    findByIdAndUpdate: (id: string, data: any, options: any) => Promise<any>;
    findByIdAndDelete: (id: string) => Promise<any>;
  };

  export default RestaurantData;
}
