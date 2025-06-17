import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Pourquoi avoir créé Le Bruit Des Planches ?",
    answer:
      "Pour donner de l’écho à des pièces belles, engagés et qui nous ont fait voyager. Pour proposer un espace vivant autour du théâtre. Pas un simple site vitrine, mais un lieu de partage et de passion.",
  },
  {
    question: "Pourquoi un blog et pas juste une page 'actus' ?",
    answer:
      "Parce qu’on a des choses à dire ! Tops, critiques, billets d’humeur… Un espace libre, mais éditorialisé, pour parler théâtre autrement.",
  },
  {
    question: "Vous publiez quoi exactement ?",
    answer:
      "Des critiques, des coups de cœur, des coups de gueule, des interviews, des tops absurdes, des analyses sérieuses… bref, un joyeux foutoir éditorial autour du théâtre.",
  },
  {
    question: "Est-ce un média objectif ?",
    answer:
      "Non. C’est un blog subjectif, honnête, assumé. On défend des choses. Mais on ne fait pas semblant d’être neutres.",
  },
  {
    question: "Qui écrit les articles ?",
    answer:
      "Des membres de l’équipe du projet et quelques plumes invitées. Si tu veux écrire, tu peux nous contacter.",
  },
  {
    question: "C’est un site militant ?",
    answer:
      "Militant, non. Engagé, oui. On croit à la culture populaire, au théâtre pour tous et à la parole libre.",
  },
  {
    question: "Pourquoi ce nom, Le Bruit Des Planches ?",
    answer:
      "Un clin d’œil au bruit des planches sur scène… et à ce qu’on y fait résonner. Parce que le théâtre, c’est du son, du souffle, de la voix.",
  },
  {
    question: "Peut-on commenter ou réagir ?",
    answer:
      "Pas encore. On privilégie une ligne claire, éditée. Mais on lit tous les messages envoyés via le formulaire.",
  },
  {
    question: "C’est un projet temporaire ?",
    answer:
      "Non. Le blog, c’est un espace à faire vivre dans le temps. Tant qu’on aura des choses à dire.",
  },
];

export default function FAQPage() {
  return (
    <div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
        Foire aux questions
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-2 max-w-2xl"
      >
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-base md:text-lg">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
