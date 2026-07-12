import Link from "next/link";
import { AmbientGlow } from "@/components/ambient-glow";

const steps = [
  {
    title: "Create your friend",
    body: "Upload a 3D model, or pick one already waiting for you.",
  },
  {
    title: "Enjoy the journey",
    body: "Watch your friend come to life while a small story unfolds.",
  },
  {
    title: "Follow their steps",
    body: "Receive three postcards from imaginary places, and connect.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 py-28 sm:py-36">
        <AmbientGlow />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted">
            An immersive prototype
          </p>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            Alero
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted sm:text-xl">
            A companion you build with your own hands, for the moments
            loneliness needs a little imagination.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/experience"
              className="rounded-full bg-accent px-8 py-3 font-medium text-white transition-transform hover:scale-105"
            >
              Enter the Experience
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-border px-8 py-3 font-medium transition-colors hover:border-accent"
            >
              About the project
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            What is Alero?
          </h2>
          <p className="mt-4 text-muted">
            Alero is a masters thesis prototype: a small exhibition and a
            working companion app in one. Bring a 3D model to life as an
            imaginary friend, then carry it with you through a short,
            illustrated journey that ends in three postcards from places
            that only exist in your friend&rsquo;s world.
          </p>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-semibold sm:text-3xl">
            How it works
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-3xl border border-border bg-card p-8"
              >
                <span className="text-sm font-medium text-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-24 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Ready to meet them?
        </h2>
        <Link
          href="/experience"
          className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-medium text-white transition-transform hover:scale-105"
        >
          Enter the Experience
        </Link>
      </section>
    </div>
  );
}
