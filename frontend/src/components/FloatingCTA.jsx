import { Phone, MessageCircle } from "lucide-react";

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 sm:hidden">
      
      {/* Container */}
      <div className="flex w-full max-w-md shadow-2xl rounded-full overflow-hidden border border-gray-200">
        
        {/* Call Button */}
        <a
          href="tel:+447593217699"
          className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-black font-bold py-4 text-sm"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>

        {/* Divider */}
        <div className="w-px bg-gray-200" />

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/447593217699"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-4 text-sm"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}