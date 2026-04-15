import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya K.",
      role: "Event Attendee",
      feedback:
        "Absolutely amazing! The whole experience was seamless and enjoyable. Truly one of the best events I’ve been to.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Arjun M.",
      role: "Music Enthusiast",
      feedback:
        "The food, the vibes, and the music were just top-notch. I felt so welcomed and had the time of my life.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sneha P.",
      role: "Repeat Guest",
      feedback:
        "I can’t wait for the next one! Everything felt so well-organized and the details were just perfect.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  return (
    <section className="testimonials container py-16">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        What People Say
      </h2>
      <p className="text-center text-gray-500 mt-2 mb-10">
        Hear from our happy attendees ✨
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-16 h-16 rounded-full border-2 border-pink-300 mb-4"
            />
            <p className="text-gray-600 italic mb-4">“{t.feedback}”</p>
            <div className="flex text-yellow-400 mb-2">
              ★★★★★
            </div>
            <h4 className="font-semibold text-gray-800">{t.name}</h4>
            <span className="text-sm text-gray-500">{t.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
