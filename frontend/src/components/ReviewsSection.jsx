import { useEffect, useState } from "react";
import axios from "axios";
import { Star, Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Fallback reviews
const fallbackReviews = [
  {
    id: "1",
    name: "Haleemat Rasheex",
    text: "They are a great company, they go above and beyond to make their customers happy. Been using them for years now, would absolutely recommend.",
    rating: 5
  },
  {
    id: "2",
    name: "Fokhor Uddin",
    text: "Very good service and prices would highly recommend.",
    rating: 5
  },
  {
    id: "3",
    name: "Mohammed Nazrul Islam",
    text: "5 star service, I have used this company for my plumbing needs.",
    rating: 5
  },
  {
    id: "4",
    name: "Halimat Raheem",
    text: "They are a great company, they go above and beyond to make their customers happy. Been using them for years now, would absolutely recommend.",
    rating: 5
  },
  {
    id: "5",
    name: "Joel Meghan",
    text: "They are a great company, they go above and beyond to make their customers happy. Been using them for years now, would absolutely recommend.",
    rating: 5
  }
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(fallbackReviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API}/reviews`);
        if (response.data && response.data.length > 0) {
          setReviews(response.data);
        }
      } catch (error) {
        console.log("Using fallback reviews");
      }
    };

    fetchReviews();
  }, []);

  return (
    <section
      id="reviews"
      data-testid="reviews-section"
      className="py-16 sm:py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-4 block">
            Customer Reviews
          </span>

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-black tracking-tight mb-4">
            What Our Customers Say
          </h2>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="text-black font-bold text-lg">5.0</span>
            <span className="text-gray-600">(166 Reviews on Google)</span>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="bg-white px-4 py-2 rounded-full shadow text-sm font-semibold">
            ⭐ 5.0 Rated Service
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow text-sm font-semibold">
            🛠️ Trusted Local Engineers
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow text-sm font-semibold">
            ⏱️ Fast Response Times
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem
                key={review.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div
                  data-testid={`review-card-${review.id}`}
                  className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 h-full overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  {/* Quote Icon */}
                  <Quote className="w-12 h-12 text-yellow-500 opacity-10 absolute top-4 right-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 leading-relaxed mb-6 relative z-10 italic">
                    "{review.text}"
                  </p>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">
                        {review.name.charAt(0)}
                      </span>
                    </div>

                    <div>
                      <p className="font-bold text-black">{review.name}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        ✔ Verified Google Review
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            data-testid="reviews-prev-btn"
            className="hidden md:flex -left-12 bg-yellow-500 hover:bg-yellow-600 text-black border-0"
          />

          <CarouselNext
            data-testid="reviews-next-btn"
            className="hidden md:flex -right-12 bg-yellow-500 hover:bg-yellow-600 text-black border-0"
          />
        </Carousel>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.google.com/search?q=yellow+ochre+gas+barking"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="google-reviews-link"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-bold transition-colors"
          >
            See why customers trust us on Google →
          </a>
        </div>
      </div>
    </section>
  );
}