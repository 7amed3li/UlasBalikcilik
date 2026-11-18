"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import {
  TbX as X,
  TbCalendar as Calendar,
  TbClock as Clock,
  TbUsers as Users,
  TbUser as User,
  TbMessageCircle as MessageCircle,
  TbPhone as Phone,
} from "react-icons/tb";

const reservationTranslations = {
  tr: {
    title: "Masa Rezervasyonu",
    subtitle: "Ulaş Balıkçılık'de yerinizi hemen ayırtın",
    nameLabel: "Adınız Soyadınız",
    namePlaceholder: "Örn: Ahmet Yılmaz",
    guestsLabel: "Kişi Sayısı",
    dateLabel: "Tarih",
    timeLabel: "Saat",
    notesLabel: "Özel İstek / Not (İsteğe bağlı)",
    notesPlaceholder: "Örn: Dış mekan masası, doğum günü vb.",
    submitWhatsApp: "WhatsApp ile Rezervasyon Yap",
    directCall: "Doğrudan Ara",
    instantConfirmation: "Anında onay & rezervasyon",
  },
  en: {
    title: "Table Reservation",
    subtitle: "Reserve your table at Ulaş Balıkçılık",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. John Doe",
    guestsLabel: "Guests",
    dateLabel: "Date",
    timeLabel: "Time",
    notesLabel: "Special Requests / Notes (Optional)",
    notesPlaceholder: "e.g. Outdoor seating, celebration",
    submitWhatsApp: "Reserve via WhatsApp",
    directCall: "Call Directly",
    instantConfirmation: "Instant confirmation via WhatsApp",
  },
  ar: {
    title: "حجز طاولة",
    subtitle: "احجز طاولتك في مطعم كارديشلر جيهانكير",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "مثال: أحمد محمد",
    guestsLabel: "عدد الأشخاص",
    dateLabel: "التاريخ",
    timeLabel: "الوقت",
    notesLabel: "طلبات خاصة / ملاحظات (اختياري)",
    notesPlaceholder: "مثال: طاولة خارجية، مناسبة خاصة",
    submitWhatsApp: "تأكيد الحجز عبر واتساب",
    directCall: "اتصال مباشر",
    instantConfirmation: "تأكيد فوري عبر واتساب",
  },
  ru: {
    title: "Бронирование Столика",
    subtitle: "Забронируйте столик в Ulaş Balıkçılık",
    nameLabel: "Ваше Имя",
    namePlaceholder: "например, Иван Петров",
    guestsLabel: "Количество гостей",
    dateLabel: "Дата",
    timeLabel: "Время",
    notesLabel: "Пожелания (необязательно)",
    notesPlaceholder: "например, столик на веранде",
    submitWhatsApp: "Забронировать в WhatsApp",
    directCall: "Позвонить",
    instantConfirmation: "Мгновенное подтверждение в WhatsApp",
  },
  fa: {
    title: "رزرو میز",
    subtitle: "میز خود را در رستوران کارداشلر جهانگیر رزرو کنید",
    nameLabel: "نام و نام خانوادگی",
    namePlaceholder: "مثال: علی رضایی",
    guestsLabel: "تعداد نفرات",
    dateLabel: "تاریخ",
    timeLabel: "ساعت",
    notesLabel: "درخواست خاص (اختیاری)",
    notesPlaceholder: "مثال: میز در فضای باز",
    submitWhatsApp: "رزرو از طریق واتس‌اپ",
    directCall: "تماس مستقیم",
    instantConfirmation: "تایید فوری از طریق واتس‌اپ",
  },
  fr: {
    title: "Réservation de Table",
    subtitle: "Réservez votre table chez Ulaş Balıkçılık",
    nameLabel: "Nom Complet",
    namePlaceholder: "ex: Jean Dupont",
    guestsLabel: "Nombre de personnes",
    dateLabel: "Date",
    timeLabel: "Heure",
    notesLabel: "Demandes particulières (Optionnel)",
    notesPlaceholder: "ex: Terrasse, anniversaire",
    submitWhatsApp: "Réserver via WhatsApp",
    directCall: "Appeler directement",
    instantConfirmation: "Confirmation instantanée par WhatsApp",
  },
  de: {
    title: "Tischreservierung",
    subtitle: "Reservieren Sie Ihren Tisch im Ulaş Balıkçılık",
    nameLabel: "Vollständiger Name",
    namePlaceholder: "z.B. Max Mustermann",
    guestsLabel: "Gästeanzahl",
    dateLabel: "Datum",
    timeLabel: "Uhrzeit",
    notesLabel: "Besondere Wünsche / Notizen (Optional)",
    notesPlaceholder: "z.B. Außensitzplatz, Geburtstag",
    submitWhatsApp: "Über WhatsApp reservieren",
    directCall: "Direkt anrufen",
    instantConfirmation: "Sofortige Bestätigung über WhatsApp",
  },
  it: {
    title: "Prenotazione Tavolo",
    subtitle: "Prenota il tuo tavolo da Ulaş Balıkçılık",
    nameLabel: "Nome Completo",
    namePlaceholder: "es: Mario Rossi",
    guestsLabel: "Numero di ospiti",
    dateLabel: "Data",
    timeLabel: "Ora",
    notesLabel: "Richieste particolari / Note (Opzionale)",
    notesPlaceholder: "es: Tavolo all'aperto, festa",
    submitWhatsApp: "Prenota su WhatsApp",
    directCall: "Chiama direttamente",
    instantConfirmation: "Conferma immediata via WhatsApp",
  },
  es: {
    title: "Reserva de Mesa",
    subtitle: "Reserva tu mesa en Ulaş Balıkçılık",
    nameLabel: "Nombre Completo",
    namePlaceholder: "ej: Juan Pérez",
    guestsLabel: "Número de personas",
    dateLabel: "Fecha",
    timeLabel: "Hora",
    notesLabel: "Peticiones especiales / Notas (Opcional)",
    notesPlaceholder: "ej: Mesa exterior, aniversario",
    submitWhatsApp: "Reservar por WhatsApp",
    directCall: "Llamar directamente",
    instantConfirmation: "Confirmación inmediata por WhatsApp",
  },
  zh: {
    title: "餐位预订",
    subtitle: "在 Ulaş Balıkçılık 预订您的专属餐位",
    nameLabel: "姓名",
    namePlaceholder: "例如：张先生",
    guestsLabel: "用餐人数",
    dateLabel: "日期",
    timeLabel: "时间",
    notesLabel: "特殊要求 / 备注（选填）",
    notesPlaceholder: "例如：室外座位、生日聚会",
    submitWhatsApp: "通过 WhatsApp 预订",
    directCall: "直接致电",
    instantConfirmation: "通过 WhatsApp 快速确认",
  },
};

export default function ReservationModal({ isOpen, onClose }) {
  const { lang, isRtl, t: appT } = useAppContext();
  const t = reservationTranslations[lang] || reservationTranslations.en;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#F4F9FB] border border-[#90C6DF]/30 shadow-xl p-6 sm:p-8 text-[#2E3B44] overflow-hidden max-h-[90vh] overflow-y-auto"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 w-9 h-9 rounded-md bg-[#E7F3F9] border border-[#90C6DF]/20 flex items-center justify-center text-[#2E3B44] hover:text-[#0C96DF] transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#0C96DF]/15 border border-[#90C6DF]/30 text-[#0C96DF] text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0C96DF]"></span>
            <span>{appT?.vipBooking || "VIP & Table Booking"}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#2E3B44] tracking-tight" style={{ fontFamily: "var(--font-cairo)" }}>
            {t.title}
          </h3>
          <p className="text-[#53636E] text-xs sm:text-sm mt-1" style={{ fontFamily: "var(--font-inter)" }}>
            {t.subtitle}
          </p>
        </div>

        {/* Form */}
        {/* CTA Button */}
        <div className="pt-4 pb-2 space-y-3">
          <a
            href="tel:+902122513696"
            className="w-full py-4 px-6 rounded-xl bg-[#EE7B3F] hover:bg-[#D15015] text-[#06384E] font-bold text-base tracking-wider uppercase flex items-center justify-center gap-3 transition-colors shadow-lg"
          >
            <Phone size={22} className="animate-pulse" />
            <span>{t.directCall}: +90 212 251 36 96</span>
          </a>
          <p className="text-center text-xs text-[#53636E]">
            {appT?.phoneReservationNotice || (lang === "ar" ? "نحن نستقبل الحجوزات عبر الهاتف فقط لضمان أفضل خدمة." : "We accept reservations by phone only to ensure the best service.")}
          </p>
        </div>

        <p className="text-center text-[11px] text-[#53636E] mt-4 flex items-center justify-center gap-1">
          <span>Firuzağa Mah., Cihangir, Beyoğlu • 09:00 - 02:00</span>
        </p>
      </div>
    </div>
  );
}
