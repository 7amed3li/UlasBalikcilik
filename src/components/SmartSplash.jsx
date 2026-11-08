"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function SmartSplash() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setShow(true);
    setIsFadingOut(false);
  }

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 650);

    const unmountTimer = setTimeout(() => {
      setShow(false);
    }, 900);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(unmountTimer);
    };
  }, [pathname]);

  if (!show) return null;

  return (
    <div id="smart-splash-container" className={`splash-container ${isFadingOut ? "fade-out" : ""}`}>
      <style>{`
        .splash-container {
          position: fixed;
          inset: 0;
          z-index: 9999999;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #0B2B3B 0%, #0E4F4A 100%);
          overflow: hidden;
          font-family: var(--font-inter, sans-serif);
          transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity;
          animation: css-safety-hide 0.1s 2.5s forwards;
        }

        @keyframes css-safety-hide {
          to { visibility: hidden; pointer-events: none; opacity: 0; }
        }

        .splash-container.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .stage {
          position: relative;
          width: min(72vw, 280px);
          aspect-ratio: 1024/675;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35), 0 0 0 3px rgba(184, 220, 211, 0.35);
          animation: mid-settle 450ms cubic-bezier(.22, .9, .32, 1.15) forwards;
        }

        .logo-layer {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @keyframes mid-settle {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }

        .tagline {
          margin-top: 20px;
          font-weight: 800;
          letter-spacing: 0.28em;
          font-size: clamp(11px, 1.5vw, 13px);
          color: #F4F1E8;
          text-transform: uppercase;
          opacity: 0;
          text-align: center;
          animation: fade-up 350ms 250ms ease-out forwards;
          z-index: 2;
        }

        .tagline span {
          color: #F26B45;
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translate3d(0, 8px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .loader {
          margin-top: 14px;
          width: 120px;
          height: 3px;
          background: rgba(184, 220, 211, 0.2);
          border-radius: 99px;
          overflow: hidden;
          opacity: 0;
          animation: fade-up 300ms 300ms ease-out forwards;
          z-index: 2;
        }

        .loader-bar {
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, #B8DCD3, #F26B45);
          border-radius: 99px;
          transform-origin: left center;
          transform: scaleX(0);
          animation: fill 500ms 320ms cubic-bezier(.4, 0, .2, 1) forwards;
        }

        @keyframes fill {
          to { transform: scaleX(1); }
        }
      `}</style>

      <div className="stage">
        <Image
          className="logo-layer"
          src="/ulas-logo.jpg"
          alt="Ulaş Balıkçılık Logo"
          fill
          priority
          unoptimized={true}
          sizes="280px"
          style={{ objectFit: "contain", padding: "10px" }}
        />
      </div>

      <div className="tagline">
        Ulaş Balıkçılık <span>&bull;</span> Cihangir &amp; Maslak 1453
      </div>

      <div className="loader">
        <div className="loader-bar" />
      </div>
    </div>
  );
}
