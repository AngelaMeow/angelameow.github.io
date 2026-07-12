import Link from "next/link";

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

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
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
