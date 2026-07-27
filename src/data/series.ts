export type SeriesId =
  | "atheism-philosophy-of-religion"
  | "continental-philosophy"
  | "indian-philosophy"
  | "vegan-philosophy";

export interface Series {
  id: SeriesId;
  title: string;
  /** Short line for topic index cards */
  blurb: string;
  /** Page header subtitle */
  subtitle: string;
  /** Opening paragraphs for the topic hub */
  about: string[];
  /** Ideas for future Saturday sessions */
  suggestedQuestions: string[];
}

export const seriesList: Series[] = [
  {
    id: "atheism-philosophy-of-religion",
    title: "Atheism & Philosophy of Religion",
    blurb: "Belief, unbelief, and arguments about God.",
    subtitle:
      "Recurring Saturday series · belief, unbelief, and arguments about God",
    about: [
      "A recurring Saturday discussion on theism, atheism, and the philosophical questions that sit between them. Sessions treat arguments seriously without assuming a prior commitment either way.",
      "Typical terrain: classical and contemporary arguments for and against God, the problem of evil, faith and evidence, religious language, and what secular ethics can (and cannot) replace.",
    ],
    suggestedQuestions: [
      "Does the fine-tuning of the universe support design?",
      "Is faith a kind of belief, a kind of trust, or something else?",
      "Can religious language be meaningful after verificationism?",
      "What remains of meaning and morality without God?",
      "Is agnosticism more rational than atheism—or a refusal to decide?",
    ],
  },
  {
    id: "continental-philosophy",
    title: "Continental Philosophy",
    blurb: "Phenomenology, existentialism, and critical thought.",
    subtitle:
      "Recurring Saturday series · phenomenology, existentialism, and critical thought",
    about: [
      "A recurring Saturday discussion in the continental traditions—less a single school than a family of methods and concerns: lived experience, historicity, freedom, power, and the limits of scientific description.",
      "We read figures and problems carefully (phenomenology, existentialism, hermeneutics, critical theory) and ask what they still help us see.",
    ],
    suggestedQuestions: [
      "What does Sartre mean by bad faith—and can we avoid it?",
      "Is Foucault’s account of power incompatible with emancipation?",
      "What is Levinas asking of us with ‘the face of the Other’?",
      "Can Gadamer’s hermeneutics rescue us from relativism?",
      "What is left of authenticity after Heidegger and Sartre?",
    ],
  },
  {
    id: "indian-philosophy",
    title: "Indian Philosophy",
    blurb: "Classical and contemporary Indian thought.",
    subtitle:
      "Recurring Saturday series · classical and contemporary Indian thought",
    about: [
      "A recurring Saturday discussion of Indian philosophical traditions—classical darśanas and living debates—treated as philosophy, not as museum pieces or mere cultural background.",
      "Themes include self and no-self, knowledge and doubt, dharma and ethics, liberation, and how classical arguments meet contemporary questions.",
    ],
    suggestedQuestions: [
      "Is the self real? Ātman, anātman, and what hangs on the dispute",
      "How should we understand śūnyatā without emptying the world?",
      "What is dharma—duty, cosmic order, or something else?",
      "Can Nyāya’s theory of knowledge survive modern skepticism?",
      "How does the Bhagavad Gītā rethink action, detachment, and responsibility?",
    ],
  },
  {
    id: "vegan-philosophy",
    title: "Vegan Philosophy",
    blurb: "Ethics, animals, and practical life.",
    subtitle: "Monthly Saturday series · ethics, animals, and practical life",
    about: [
      "A recurring Saturday discussion on the moral and practical questions raised by our treatment of animals—rights, interests, food systems, and what consistency demands of us.",
      "Sessions aim for clarity over slogan: arguments for and against veganism, speciesism, wild-animal suffering, and the gap between theory and habit.",
    ],
    suggestedQuestions: [
      "Does sentience alone ground moral status?",
      "Is the replaceability argument a threat to animal ethics?",
      "Should wild-animal suffering change how we think about nature?",
      "Can you reject factory farming without going vegan?",
      "Is speciesism analogous to racism—or a misleading comparison?",
    ],
  },
];

export function getSeries(id: SeriesId): Series {
  const found = seriesList.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown series: ${id}`);
  return found;
}
