import Image from "next/image";

type DestinationCardType = {
  item: number;
};
export function PopularDestinationCard({ item }: DestinationCardType) {
  return (
    <div key={item} className="relative group cursor-pointer">
      <div className="relative h-80 w-full rounded-xl overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dr9md8vbd/image/upload/v1760090022/assets/mgg-vitchakorn-DDn9I5V1ubE-unsplash_nljmjt.jpg"
          alt={`image${item}`}
          width={400}
          height={320}
          className="object-cover w-full h-full"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Restaurant Name {item}</h3>
        <p className="text-sm opacity-90">Location • $$$ • Cuisine Type</p>
      </div>
    </div>
  );
}
