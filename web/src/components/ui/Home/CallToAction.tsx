export default function CallToAction() {
  return (
    <section className="w-full py-20 flex justify-center">
      <div className="w-[90%] flex flex-col items-center text-center">
        <h2 className="text-5xl font-bold mb-6">
          Ready to Start Your Food Journey?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Join thousands of food enthusiasts and discover the best dining
          experiences in your area. Download our app today and start exploring!
        </p>
        <div className="flex gap-4">
          <button className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors">
            Download iOS App
          </button>
          <button className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors">
            Download Android App
          </button>
        </div>
      </div>
    </section>
  );
}
