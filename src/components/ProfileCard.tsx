"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./ProfileCard.css";

type ProfileCardProps = {
  avatarUrl?: string;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  onContactClick?: () => void;
  showUserInfo?: boolean;
};

/**
 * Pointer-tilt holographic profile card (mechanics after ReactBits' ProfileCard),
 * re-skinned to the warm ink + burnt-orange palette. Falls back to a static card
 * under prefers-reduced-motion / coarse pointers.
 */
export function ProfileCard({
  avatarUrl = "/me.png",
  miniAvatarUrl,
  name = "Manas Dubey",
  title = "SDE / AI Engineer",
  handle = "@Manasd007",
  status = "Open to work",
  contactText = "Contact",
  onContactClick,
  showUserInfo = true,
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const [imgOk, setImgOk] = useState(false);

  // Preload the avatar: only render <img> once it actually loads, so a missing
  // file shows the clean initials placeholder (no broken-image icon).
  useEffect(() => {
    if (!avatarUrl) return;
    let alive = true;
    const img = new window.Image();
    img.onload = () => alive && setImgOk(true);
    img.onerror = () => alive && setImgOk(false);
    img.src = avatarUrl;
    return () => {
      alive = false;
    };
  }, [avatarUrl]);

  const setVars = useCallback((vars: Record<string, string>) => {
    const el = wrapRef.current;
    if (!el) return;
    for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      const card = cardRef.current;
      if (!card) return;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const px = x / r.width;
        const py = y / r.height;
        setVars({
          "--pointer-x": `${px * 100}%`,
          "--pointer-y": `${py * 100}%`,
          "--rotate-x": `${(px - 0.5) * 18}deg`,
          "--rotate-y": `${(0.5 - py) * 18}deg`,
          "--bg-x": `${30 + px * 40}%`,
          "--bg-y": `${30 + py * 40}%`,
          "--card-opacity": "1",
        });
      });
    },
    [setVars]
  );

  const onEnter = useCallback(() => {
    wrapRef.current?.classList.add("active");
  }, []);

  const onLeave = useCallback(() => {
    cancelAnimationFrame(raf.current);
    wrapRef.current?.classList.remove("active");
    setVars({
      "--pointer-x": "50%",
      "--pointer-y": "50%",
      "--rotate-x": "0deg",
      "--rotate-y": "0deg",
      "--bg-x": "50%",
      "--bg-y": "50%",
      "--card-opacity": "0",
    });
  }, [setVars]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const mini = miniAvatarUrl ?? avatarUrl;
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="pc-wrap" ref={wrapRef}>
      <div
        className="pc-card"
        ref={cardRef}
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
      >
        <div className="pc-placeholder" aria-hidden>
          {initials}
        </div>

        {imgOk && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="pc-avatar" src={avatarUrl} alt="" draggable={false} />
        )}

        <div className="pc-grade" aria-hidden />
        <div className="pc-shine" aria-hidden />
        <div className="pc-glare" aria-hidden />

        <div className="pc-head">
          <div className="pc-name">
            {name.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="pc-accent">{name.split(" ").slice(-1)}</span>
          </div>
          <div className="pc-title">{title}</div>
        </div>

        {showUserInfo && (
          <div className="pc-user">
            <div className="pc-user-left">
              {imgOk ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="pc-mini" src={mini} alt="" draggable={false} />
              ) : (
                <span className="pc-mini" />
              )}
              <div style={{ minWidth: 0 }}>
                <div className="pc-handle">{handle}</div>
                <div className="pc-status">
                  <span className="pc-dot" /> {status}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="pc-contact"
              data-cursor="Email"
              onClick={onContactClick}
            >
              {contactText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
