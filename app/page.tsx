"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { PALETTES, Palette, LogoCombo } from "@/lib/palettes";

function LogoCombos({ combos }: { combos: LogoCombo[] }) {
  return (
    <div style={{ marginTop: "16px" }}>
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "10px",
        }}
      >
        Logo color combos
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {combos.map((combo, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 0",
              minWidth: "120px",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                backgroundColor: combo.bg,
                padding: "18px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: combo.fg,
                  fontWeight: 900,
                  fontSize: "clamp(18px, 3vw, 26px)",
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                TULAGI
              </span>
            </div>
            <div
              style={{
                padding: "6px 10px",
                background: "var(--panel2)",
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--muted)",
                textAlign: "center",
                letterSpacing: "0.05em",
              }}
            >
              {combo.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1.5 mb-4">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className={`text-3xl leading-none transition-transform hover:scale-110 cursor-pointer border-none bg-transparent p-0 ${
            n <= (hover || value) ? "text-[#c8f135]" : "text-[#3a3550]"
          }`}
          aria-label={`Rate ${n} out of 5`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function LogoImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const labels = images.map((_, i) => `Logo ${i + 1}`);
  return (
    <div style={{ marginTop: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Logo color combos
        </div>
        {images.length > 1 && (
          <div style={{ display: "flex", gap: "6px" }}>
            {labels.map((label, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: "1px solid var(--line)",
                  background: i === active ? "var(--accent)" : "var(--panel2)",
                  color: i === active ? "#0b0a12" : "var(--muted)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[active]}
        alt={`Logo color combinations — ${labels[active]}`}
        style={{
          width: "100%",
          maxHeight: "260px",
          objectFit: "contain",
          borderRadius: "10px",
          border: "1px solid var(--line)",
          display: "block",
          background: "#000",
        }}
      />
    </div>
  );
}

function PaletteSwatches({ palette }: { palette: Palette }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 overflow-hidden rounded-xl min-h-[220px]">
        {palette.colors.map((color, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col justify-end pb-4 px-2 relative group"
            style={{ backgroundColor: color.hex }}
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-lg px-2 py-1.5 text-center">
              <div className="text-white text-xs font-bold">{color.name}</div>
              <div className="text-white/70 text-[10px] font-mono">{color.hex}</div>
            </div>
          </div>
        ))}
      </div>
      {palette.combosImages && palette.combosImages.length > 0 ? (
        <LogoImageGallery images={palette.combosImages} />
      ) : palette.combos && palette.combos.length > 0 ? (
        <LogoCombos combos={palette.combos} />
      ) : null}
    </div>
  );
}

interface FeedbackState {
  rating: number;
  comment: string;
  submitted: boolean;
  loading: boolean;
  error: string;
}

function PaletteCard({
  palette,
  reviewerName,
  onNameMissing,
}: {
  palette: Palette;
  reviewerName: string;
  onNameMissing: () => void;
}) {
  const [fb, setFb] = useState<FeedbackState>({
    rating: 0,
    comment: "",
    submitted: false,
    loading: false,
    error: "",
  });

  async function submit() {
    if (!reviewerName.trim()) {
      onNameMissing();
      return;
    }
    if (!fb.rating && !fb.comment.trim()) {
      setFb((p) => ({ ...p, error: "Add a rating or a comment first." }));
      return;
    }
    setFb((p) => ({ ...p, loading: true, error: "" }));
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          palette_id: palette.id,
          palette_title: palette.title,
          reviewer_name: reviewerName,
          rating: fb.rating || null,
          comment: fb.comment.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setFb((p) => ({ ...p, submitted: true, loading: false }));
    } catch (err: unknown) {
      setFb((p) => ({
        ...p,
        loading: false,
        error: err instanceof Error ? err.message : "Something went wrong.",
      }));
    }
  }

  return (
    <div
      style={{
        background: "var(--panel)",
        border: "1px solid var(--line)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "480px",
      }}
    >
      {/* Swatch panel */}
      <div style={{ flex: 1, padding: "24px" }}>
        <PaletteSwatches palette={palette} />
      </div>

      {/* Info + feedback panel */}
      <div
        style={{
          borderTop: "1px solid var(--line)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            display: "inline-block",
            alignSelf: "flex-start",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "5px 11px",
            borderRadius: "6px",
            color: "#0b0a12",
            background: "var(--accent)",
            marginBottom: "12px",
          }}
        >
          {palette.badge}
        </span>
        <h2
          style={{
            fontSize: "clamp(20px, 2.4vw, 28px)",
            fontWeight: 800,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            marginBottom: "8px",
          }}
        >
          {palette.title}
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.6, marginBottom: "20px" }}>
          {palette.desc}
        </p>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: "20px" }}>
          {fb.submitted ? (
            <div style={{ color: "#c8f135", fontWeight: 600, fontSize: "14px", padding: "8px 0" }}>
              ✓ Feedback submitted — thanks!
            </div>
          ) : (
            <>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "8px",
                }}
              >
                Your rating
              </div>
              <StarRating
                value={fb.rating}
                onChange={(v) => setFb((p) => ({ ...p, rating: v, error: "" }))}
              />
              <textarea
                style={{
                  width: "100%",
                  background: "var(--panel2)",
                  border: "1px solid var(--line)",
                  borderRadius: "10px",
                  color: "var(--text)",
                  padding: "11px 13px",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  marginBottom: "10px",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                placeholder="Comments / feedback on this palette…"
                rows={3}
                value={fb.comment}
                onChange={(e) => setFb((p) => ({ ...p, comment: e.target.value, error: "" }))}
              />
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "var(--accent)",
                  color: "#0b0a12",
                  border: "none",
                  borderRadius: "10px",
                  fontFamily: "inherit",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: fb.loading ? "default" : "pointer",
                  opacity: fb.loading ? 0.55 : 1,
                }}
                disabled={fb.loading}
                onClick={submit}
              >
                {fb.loading ? "Sending…" : "Submit feedback"}
              </button>
              {fb.error && (
                <div style={{ color: "#ff8585", fontSize: "13px", marginTop: "8px" }}>
                  {fb.error}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [idx, setIdx] = useState(0);
  const [reviewerName, setReviewerName] = useState("");
  const [nameMissing, setNameMissing] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const total = PALETTES.length;

  const go = useCallback(
    (next: number) => {
      setIdx(((next % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "ArrowRight") go(idx + 1);
      if (e.key === "ArrowLeft") go(idx - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, go]);

  const touchStart = useRef(0);
  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 45) go(dx < 0 ? idx + 1 : idx - 1);
  }

  function handleNameMissing() {
    setNameMissing(true);
    nameRef.current?.focus();
    nameRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    setTimeout(() => setNameMissing(false), 3000);
  }

  const palette = PALETTES[idx];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0a12",
        color: "var(--text)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "2px",
            }}
          >
            Color Palette Review
          </div>
          <div style={{ fontWeight: 800, fontSize: "18px", lineHeight: 1.2 }}>
            Team Opinion Tracker
          </div>
        </div>
        <div
          style={{
            color: "var(--muted)",
            fontSize: "14px",
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {idx + 1} / {total}
        </div>
      </header>

      {/* Reviewer bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          padding: "18px 24px",
          background: "var(--panel)",
          borderBottom: "1px solid var(--line)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "20px" }}>👋</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: "17px", lineHeight: 1.15 }}>
              Enter your name to start
            </div>
            <small
              style={{
                display: "block",
                fontWeight: 600,
                fontSize: "12px",
                color: "var(--muted)",
                marginTop: "3px",
              }}
            >
              Used on every palette you review · required
            </small>
          </div>
        </div>
        <input
          ref={nameRef}
          type="text"
          autoComplete="name"
          placeholder="Type your name here…"
          value={reviewerName}
          onChange={(e) => {
            setReviewerName(e.target.value);
            setNameMissing(false);
          }}
          style={{
            background: "var(--panel2)",
            border: `1px solid ${nameMissing ? "#ff8585" : "var(--line)"}`,
            borderRadius: "10px",
            color: "var(--text)",
            padding: "11px 16px",
            fontSize: "15px",
            fontFamily: "inherit",
            fontWeight: 500,
            minWidth: "220px",
            flex: "0 0 auto",
            outline: "none",
            boxShadow: nameMissing ? "0 0 0 4px rgba(255,133,133,.25)" : undefined,
          }}
        />
      </div>

      {/* Stage */}
      <div
        style={{ flex: 1, padding: "24px 16px" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto", height: "100%" }}>
          <PaletteCard
            key={palette.id}
            palette={palette}
            reviewerName={reviewerName}
            onNameMissing={handleNameMissing}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "0 24px 24px" }}>
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => go(idx - 1)}
              disabled={idx === 0}
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: "10px",
                color: idx === 0 ? "var(--muted)" : "var(--text)",
                padding: "10px 18px",
                fontFamily: "inherit",
                fontSize: "14px",
                fontWeight: 600,
                cursor: idx === 0 ? "default" : "pointer",
                opacity: idx === 0 ? 0.45 : 1,
              }}
            >
              ← Previous
            </button>

            <div style={{ display: "flex", gap: "8px" }}>
              {PALETTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to palette ${i + 1}`}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    border: "none",
                    background: i === idx ? "var(--accent)" : "#332e49",
                    cursor: "pointer",
                    padding: 0,
                    transform: i === idx ? "scale(1.25)" : "scale(1)",
                    transition: "all 0.15s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => go(idx + 1)}
              disabled={idx === total - 1}
              style={{
                background: idx === total - 1 ? "var(--panel)" : "var(--accent)",
                border: "none",
                borderRadius: "10px",
                color: idx === total - 1 ? "var(--muted)" : "#0b0a12",
                padding: "10px 18px",
                fontFamily: "inherit",
                fontSize: "14px",
                fontWeight: 700,
                cursor: idx === total - 1 ? "default" : "pointer",
                opacity: idx === total - 1 ? 0.45 : 1,
              }}
            >
              Next palette →
            </button>
          </div>

          <footer
            style={{
              fontSize: "12px",
              color: "#6f6a8c",
              textAlign: "center",
            }}
          >
            Palettes are in-progress and not final · Use the buttons, dots, swipe, or ← → keys to move between options.
          </footer>
        </div>
      </nav>
    </div>
  );
}
