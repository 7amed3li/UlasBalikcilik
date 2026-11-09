"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, UtensilsCrossed } from "lucide-react";

import { useAppContext } from "@/context/AppContext";

// Convert URLs in text to clickable links
function renderMessageText(text) {
  // Match URLs: http(s)://..., wa.me/..., and bare domain patterns
  const urlRegex = /(https?:\/\/[^\s)]+|wa\.me\/[^\s)]+)/gi;
  const parts = text.split(urlRegex);
  
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      // Reset regex lastIndex after test
      urlRegex.lastIndex = 0;
      const href = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-[#9C7A3F]/60 underline-offset-2 hover:text-[#9C7A3F] transition-colors font-medium"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

const chatI18n = {
  tr: {
    greeting: "Merhaba! Menüden ne istersiniz? Yerel lezzetler mi, yoksa tanıdık tatlar mı arıyorsunuz? Herhangi bir diyet tercihiniz var mı?",
    placeholder: "Mesajınızı yazın...",
    send: "Gönder",
    contact: "Bizimle WhatsApp üzerinden iletişime geçin",
    loading: "Yazıyor..."
  },
  ar: {
    greeting: "مرحباً بكم في مطعم Ulaş Balıkçılık! هل تبحث عن أسماك مشوية أو مقلية أو مقبلات بحرية خاصة؟",
    placeholder: "اكتب استفسارك هنا...",
    send: "إرسال",
    contact: "اتصل بفرع مسلك: 0212 813 57 57",
    loading: "جاري الرد..."
  },
  fa: {
    greeting: "سلام! به رستوران Ulaş Balıkçılık خوش آمدید. به دنبال ماهی کبابی، سرخ‌شده یا پیش‌غذاهای دریایی هستید؟",
    placeholder: "پیام خود را بنویسید...",
    send: "ارسال",
    contact: "تماس با شعبه مسلک: 0212 813 57 57",
    loading: "در حال پاسخگویی..."
  },
  ru: {
    greeting: "Здравствуйте! Добро пожаловать в Ulaş Balıkçılık. Ищете свежую черноморскую рыбу на гриле или закуски мезе?",
    placeholder: "Напишите ваш вопрос...",
    send: "Отправить",
    contact: "Позвонить в филиал Маслак: 0212 813 57 57",
    loading: "Печатает..."
  },
  fr: {
    greeting: "Bonjour ! Bienvenue chez Ulaş Balıkçılık. Cherchez-vous du poisson frais grillé ou des mezzés de la mer ?",
    placeholder: "Écrivez votre message...",
    send: "Envoyer",
    contact: "Appeler Maslak 1453 : 0212 813 57 57",
    loading: "En train d'écrire..."
  },
  de: {
    greeting: "Hallo! Willkommen bei Ulaş Balıkçılık. Suchen Sie frischen Fisch vom Grill oder Meeresfrüchte-Mezze?",
    placeholder: "Nachricht eingeben...",
    send: "Senden",
    contact: "Maslak 1453 anrufen: 0212 813 57 57",
    loading: "Schreibt..."
  },
  it: {
    greeting: "Ciao! Benvenuto da Ulaş Balıkçılık. Cerchi pesce fresco alla griglia o antipasti di mare?",
    placeholder: "Scrivi un messaggio...",
    send: "Invia",
    contact: "Chiama Maslak 1453: 0212 813 57 57",
    loading: "Sta scrivendo..."
  },
  es: {
    greeting: "¡Hola! Bienvenido a Ulaş Balıkçılık. ¿Buscas pescado fresco a la parrilla o entrantes marinos?",
    placeholder: "Escribe un mensaje...",
    send: "Enviar",
    contact: "Llamar a Maslak 1453: 0212 813 57 57",
    loading: "Escribiendo..."
  },
  zh: {
    greeting: "您好！欢迎光临 Ulaş Balıkçılık 鱼餐厅。您想品尝新鲜黑海烤鱼还是海鲜前菜？",
    placeholder: "请输入您的消息...",
    send: "发送",
    contact: "致电 Maslak 分店：0212 813 57 57",
    loading: "正在输入..."
  },
  en: {
    greeting: "Hi there! Welcome to Ulaş Balıkçılık. Looking for daily fresh grilled fish, crispy pans, or seafood mezze?",
    placeholder: "Type a message...",
    send: "Send",
    contact: "Call Maslak 1453: 0212 813 57 57",
    loading: "Typing..."
  }
};

export default function ChatWidget() {
  const { lang = "tr" } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef(null);

  // Focus management
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);

  const activeLang = lang || "tr";
  const strings = chatI18n[activeLang] || chatI18n.en || chatI18n.tr;
  const isRTL = activeLang === "ar" || activeLang === "fa";

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      setMessages([{ role: "model", text: strings.greeting }]);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Trap focus & escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Small delay to ensure input is rendered before focus
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to UI immediately
    const newMessages = [...messages, { role: "user", text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Format history for Gemini API: [{role: 'user'|'model', parts: [{text: string}]}]
      const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history, lang: activeLang })
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: "model", text: data.reply }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: "model", text: data.error }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        role: "model", 
        text: "Sorry, I'm having trouble connecting. Please reach out via WhatsApp: wa.me/902122513696" 
      }]);
    } finally {
      setIsLoading(false);
      // Refocus input after response
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ease-out ${isOpen ? "inset-0 flex flex-col sm:inset-auto sm:block sm:bottom-6 sm:right-6" : "bottom-[88px] right-4 sm:bottom-6 sm:right-6"}`}>
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#4E5F4C] text-white shadow-md hover:bg-[#3D4B3B] transition-colors focus:outline-none"
          aria-label="Open AI Concierge"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      <div 
        ref={chatWindowRef}
        className={`flex flex-col bg-[#F7F2E7] text-[#2B2620] border border-[#9C7A3F]/30 shadow-xl overflow-hidden transition-all duration-200 ease-out origin-bottom-right
          ${isOpen ? "opacity-100 scale-100 w-full h-full flex-1 sm:flex-none sm:h-[500px]" : "opacity-0 scale-95 h-0 pointer-events-none"}
          sm:w-[380px] sm:rounded-2xl
        `}
        dir={isRTL ? "rtl" : "ltr"}
        role="dialog"
        aria-modal="true"
        aria-label="AI Concierge Chat"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#9C7A3F]/20 bg-[#EDE3CE]">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-[#4E5F4C]" />
            <h3 className="font-bold text-[#2B2620]">AI Concierge</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-[#2B2620] hover:text-[#9C7A3F] transition-colors focus:outline-none"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp Fallback Link */}
        <div className="px-4 py-2 bg-[#F7F2E7] text-xs text-center border-b border-[#9C7A3F]/10 text-[#7A7364]">
          <a href="https://wa.me/902122513696" target="_blank" rel="noopener noreferrer" className="hover:text-[#2B2620] transition-colors underline decoration-[#9C7A3F]/50 underline-offset-2 font-medium">
            {strings.contact}
          </a>
        </div>

        {/* Messages Area */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar scroll-smooth bg-[#EDE3CE]"
          aria-live="polite"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[85%] px-4 py-2 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-[#4E5F4C] text-[#EAF0E6] rounded-tr-sm" 
                    : "bg-[#F7F2E7] text-[#2B2620] border border-[#9C7A3F]/20 rounded-tl-sm"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{renderMessageText(msg.text)}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-[#F7F2E7] border border-[#9C7A3F]/20 text-[#2B2620] px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center h-10">
                <span className="w-1.5 h-1.5 bg-[#9C7A3F] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 bg-[#9C7A3F] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 bg-[#9C7A3F] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                <span className="sr-only">{strings.loading}</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-[#FAF7F0] border-t border-[#9C7A3F]/20 shrink-0" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={strings.placeholder}
              className={`w-full bg-[#EDE3CE] text-[#2B2620] placeholder:text-[#7A7364] border border-[#9C7A3F]/30 rounded-full py-2.5 outline-none focus:border-[#9C7A3F] focus:ring-1 focus:ring-[#9C7A3F] transition-colors
                ${isRTL ? "pr-4 pl-12" : "pl-4 pr-12"}
              `}
              disabled={isLoading}
              aria-label={strings.placeholder}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#4E5F4C] text-[#EAF0E6] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3D4B3B] transition-colors
                ${isRTL ? "left-2" : "right-2"}
              `}
              aria-label={strings.send}
            >
              <Send className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}
