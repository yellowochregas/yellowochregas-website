import { Phone, MessageCircle } from "lucide-react";

export default function FloatingCTA() {
  const whatsappMessage = encodeURIComponent(
    "Hi, I need help with a plumbing/heating issue. Can you assist?"
  );

  const whatsappLink = `https://wa.me/447593217699?text=${whatsappMessage}`;

  return (
    <>
      {/* MOBILE BAR */}
      <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 sm:hidden">
        <div className="flex w-full max-w-md shadow-2xl rounded-full overflow-hidden border border-gray-200">

          {/* Call */}
          <a
            href="tel:+447593217699"
            className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-black font-bold py-4 text-sm"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>

          <div className="w-px bg-gray-200" />

          {/* WhatsApp (PULSE) */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-4 text-sm overflow-hidden"
          >
            {/* Pulse Effect */}
            <span className="absolute inset-0 bg-green-400 opacity-30 animate-ping rounded-full"></span>

            <MessageCircle className="w-5 h-5 relative z-10" />
            <span className="relative z-10">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* DESKTOP FLOATING */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-50 flex-col gap-4">

        {/* Call */}
        <a
          href="tel:+447593217699"
          className="bg-yellow-500 text-black p-4 rounded-full shadow-xl hover:scale-110 transition"
        >
          <Phone />
        </a>

        {/* WhatsApp with pulse */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-green-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition overflow-hidden"
        >
          <span className="absolute inset-0 bg-green-400 opacity-30 animate-ping rounded-full"></span>
          <MessageCircle className="relative z-10" />
        </a>
      </div>
    </>
  );
}