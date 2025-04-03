import Button from "@/components/atoms/buttons/Button";

export default function CallToAction() {
  return (
    <section className="w-full py-20 px-4  flex justify-center">
      <div className="w-[90%] flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-6xl font-bold mb-16 text-center">
          Ready to Start Your Food Journey?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Join thousands of food enthusiasts and discover the best dining
          experiences in your area. Download our app today and start exploring!
        </p>
        <div className="flex gap-4">
          <Button
            text="Download iOS App"
            variant="solid"
            color="black"
            size="lg"
          />
          <Button
            text="Download Android App"
            variant="solid"
            color="black"
            size="lg"
          />
        </div>
      </div>
    </section>
  );
}
