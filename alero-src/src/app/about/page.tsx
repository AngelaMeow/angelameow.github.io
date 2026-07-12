import Link from "next/link";

function ArrivalDiagram() {
  return (
    <svg viewBox="0 0 120 90" className="h-20 w-28">
      <rect x="8" y="10" width="18" height="22" rx="2" fill="none" stroke="var(--border)" strokeWidth="2" />
      <rect x="30" y="10" width="18" height="22" rx="2" fill="none" stroke="var(--border)" strokeWidth="2" />
      <rect x="52" y="10" width="18" height="22" rx="2" fill="none" stroke="var(--border)" strokeWidth="2" />
      <ellipse cx="65" cy="62" rx="26" ry="14" fill="none" stroke="var(--accent-2)" strokeWidth="2.5" />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 65 + Math.cos(rad) * 34;
        const cy = 62 + Math.sin(rad) * 19;
        return <circle key={deg} cx={cx} cy={cy} r="4" fill="var(--accent)" />;
      })}
    </svg>
  );
}

function JourneyDiagram() {
  return (
    <svg viewBox="0 0 120 60" className="h-16 w-32">
      <rect x="2" y="6" width="24" height="48" rx="2" fill="none" stroke="var(--accent-2)" strokeWidth="2" />
      <line x1="8" y1="18" x2="20" y2="18" stroke="var(--accent-2)" strokeWidth="2" />
      <line x1="8" y1="24" x2="20" y2="24" stroke="var(--accent-2)" strokeWidth="2" />
      <line x1="8" y1="30" x2="16" y2="30" stroke="var(--accent-2)" strokeWidth="2" />

      <rect x="32" y="6" width="24" height="48" rx="2" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <polygon points="41,20 41,40 51,30" fill="var(--accent)" />

      <rect x="62" y="6" width="24" height="48" rx="2" fill="none" stroke="var(--accent-2)" strokeWidth="2" />
      <line x1="68" y1="18" x2="80" y2="18" stroke="var(--accent-2)" strokeWidth="2" />
      <line x1="68" y1="24" x2="80" y2="24" stroke="var(--accent-2)" strokeWidth="2" />
      <line x1="68" y1="30" x2="74" y2="30" stroke="var(--accent-2)" strokeWidth="2" />

      <rect x="92" y="6" width="24" height="48" rx="2" fill="none" stroke="var(--accent-3)" strokeWidth="2" />
      <path
        d="M96 20 L100 26 L104 18 L108 28 L112 20"
        fill="none"
        stroke="var(--accent-3)"
        strokeWidth="2"
      />
      <path
        d="M96 36 L100 42 L104 34 L108 44 L112 36"
        fill="none"
        stroke="var(--accent-3)"
        strokeWidth="2"
      />
    </svg>
  );
}

function TogetherDiagram() {
  const cells = Array.from({ length: 9 });
  return (
    <svg viewBox="0 0 120 90" className="h-20 w-28">
      <rect x="6" y="4" width="108" height="54" rx="3" fill="none" stroke="var(--border)" strokeWidth="2" />
      {cells.map((_, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const colors = ["var(--accent)", "var(--accent-2)", "var(--accent-3)"];
        return (
          <rect
            key={i}
            x={12 + col * 34}
            y={10 + row * 15}
            width="28"
            height="11"
            rx="1.5"
            fill={colors[(i + row) % 3]}
            opacity="0.55"
          />
        );
      })}
      <rect x="50" y="66" width="20" height="22" rx="4" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <line x1="56" y1="82" x2="64" y2="82" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  );
}

const rooms = [
  {
    name: "Room 1 — Arrival",
    diagram: <ArrivalDiagram />,
    body: "A round table under a single hanging light, six seats, and three framed panels on the wall walking visitors through what they're about to do — the same three steps the app itself follows.",
  },
  {
    name: "Room 2 — The Journey",
    diagram: <JourneyDiagram />,
    body: "Four walls carry one story in four parts: a welcoming text, a short film, a page to read, and a wall of abstract, static-like graphics. Visitors sit on floor cushions while soft ambient chatter plays underneath, entering directly from Room 1.",
  },
  {
    name: "Room 3 — Together",
    diagram: <TogetherDiagram />,
    body: "A shared wall of postcards grows with every visitor: connect your phone, and your friend's journey joins everyone else's on the screen — the exhibition's version of “follow your friend's steps, and connect with others.”",
  },
];

export default function About() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted">
          About
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          A thesis, in the shape of a friend
        </h1>
        <p className="mt-6 text-lg text-muted">
          Alero is a final project for a masters degree in design — a
          prototype exploring how loneliness, creativity, and connection can
          live inside a small interactive object: an imaginary friend you
          build yourself.
        </p>
        <p className="mt-4 text-muted">
          This site is both the introduction to the concept and the entrance
          to the working prototype. Upload a 3D model, or borrow one already
          made, and step through a short experience that ends with three
          postcards from places your friend imagined for you.
        </p>
      </div>

      <div className="mx-auto mt-20 max-w-5xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-muted">
          The brief
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Inside the exhibition
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Alero doesn&rsquo;t only live on a screen. The thesis brief imagines
          it as a three-room physical exhibition, mapped directly onto the
          app&rsquo;s own journey: visitors create, then journey, then
          connect — moving through space the same way they move through the
          three screens.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {rooms.map((room) => (
            <div
              key={room.name}
              className="flex flex-col rounded-3xl border border-border bg-card p-6"
            >
              <div className="flex h-20 items-center">{room.diagram}</div>
              <h3 className="mt-4 font-semibold">{room.name}</h3>
              <p className="mt-2 text-sm text-muted">{room.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-semibold">Made by</h2>
            <p className="mt-1 text-sm text-muted">Angela Velasquez</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-semibold">Status</h2>
            <p className="mt-1 text-sm text-muted">
              Prototype — built for exhibition, not production.
            </p>
          </div>
        </div>

        <Link
          href="/experience"
          className="mt-12 inline-block rounded-full bg-accent px-8 py-3 font-medium text-white transition-transform hover:scale-105"
        >
          Enter the Experience
        </Link>
      </div>
    </div>
  );
}
