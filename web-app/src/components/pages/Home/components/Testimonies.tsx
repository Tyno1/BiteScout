// components/Testimonials.tsx
const Testimonials: React.FC = () => {
  return (
    <section className="w-full py-20 px-4 flex justify-center bg-gray-50">
      <div className="w-[90%] flex flex-col items-center">
        <h2 className="text-3xl md:text-6xl font-bold mb-16 text-center">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "This platform has completely transformed how I discover new restaurants. The photo-first approach helps me make better dining choices.",
              author: "Sarah Johnson",
              role: "Food Blogger",
            },
            {
              quote:
                "As a restaurant owner, this platform has helped us reach more customers and showcase our dishes in the best possible way.",
              author: "Michael Chen",
              role: "Restaurant Owner",
            },
            {
              quote:
                "I love how easy it is to find and book restaurants. The recommendations are always spot-on!",
              author: "Emma Davis",
              role: "Regular User",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
