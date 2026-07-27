import { getSeries, type SeriesId } from "./series";

export interface Event {
  /** YYYY-MM-DD */
  date: string;
  /** URL slug after the date, e.g. vegan-philosophy */
  slug: string;
  seriesId: SeriesId;
  /** Central question or subtitle for this session */
  question: string;
  /** Optional longer blurb on the event page */
  summary?: string;
}

/** Scheduled Saturday sessions (12:00–13:00 IST). */
export const events: Event[] = [
  {
    date: "2026-08-01",
    slug: "vegan-philosophy",
    seriesId: "vegan-philosophy",
    question: "Can speciesism be justified?",
    summary:
      "We often treat membership in Homo sapiens as enough to ground stronger moral claims than we grant other animals. Is that a defensible principle, a useful rule of thumb, or a prejudice? We’ll press the analogy with racism and sexism, and ask what follows if the analogy holds—or fails.",
  },
  {
    date: "2026-08-08",
    slug: "atheism-philosophy-of-religion",
    seriesId: "atheism-philosophy-of-religion",
    question: "Does the problem of evil make theism unreasonable?",
    summary:
      "If a perfectly good, powerful God exists, why is there so much suffering? We’ll separate logical from evidential versions of the problem, look at free-will and soul-making replies, and ask whether atheism, skeptical theism, or something else is the most honest response.",
  },
  {
    date: "2026-08-15",
    slug: "continental-philosophy",
    seriesId: "continental-philosophy",
    question: "What is phenomenology asking us to do?",
    summary:
      "Phenomenology promises a return ‘to the things themselves’—but what does that method actually require? We’ll sketch Husserl’s project, note Heidegger’s turn, and ask whether phenomenology is a rigorous science of experience, a style of description, or a critique of how we usually see.",
  },
  {
    date: "2026-08-22",
    slug: "indian-philosophy",
    seriesId: "indian-philosophy",
    question: "Is the self real? Ātman, anātman, and what hangs on it",
    summary:
      "Upaniṣadic and later Hindu thought often treats the true self (ātman) as central; Buddhist arguments push no-self (anātman). We’ll clarify what each side denies, what kind of ‘self’ is at stake, and why the dispute matters for ethics, liberation, and ordinary personhood.",
  },
];

export function eventPath(event: Event): string {
  return `events/${event.date}-${event.slug}/`;
}

export function eventTitle(event: Event): string {
  return getSeries(event.seriesId).title;
}

/** Display like "1 Aug 2026" */
export function formatShortDate(date: string): string {
  const d = new Date(`${date}T12:00:00+05:30`);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

/** Display like "Saturday, 1 August 2026" */
export function formatLongDate(date: string): string {
  const d = new Date(`${date}T12:00:00+05:30`);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export function googleCalendarUrl(event: Event, pageUrl: string): string {
  const title = encodeURIComponent(`Third Room: ${eventTitle(event)}`);
  const compact = event.date.replace(/-/g, "");
  const details = encodeURIComponent(
    `${event.question}\n\nThird Room Saturday discussion. Zoom link will be shared before the event.\n${pageUrl}`,
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${compact}T120000%2F${compact}T130000&ctz=Asia%2FKolkata&details=${details}&location=${encodeURIComponent("Online (Zoom)")}`;
}

export function upcomingEvents(asOf = new Date()): Event[] {
  const today = asOf.toISOString().slice(0, 10);
  return events.filter((e) => e.date >= today);
}

export function eventsForSeries(seriesId: SeriesId): Event[] {
  return events.filter((e) => e.seriesId === seriesId);
}

export function getEvent(date: string, slug: string): Event | undefined {
  return events.find((e) => e.date === date && e.slug === slug);
}
