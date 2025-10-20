import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'What is Calobite?',
    answer: 'Calobite is a comprehensive nutrition tracking platform that helps you understand the food you eat. We provide detailed nutritional information for millions of products, allowing you to make smarter, healthier choices.'
  },
  {
    question: 'How accurate is the nutritional data?',
    answer: 'Our data is sourced from official, verified databases like the USDA FoodData Central and the Open Food Facts database. We continuously update our information to ensure the highest level of accuracy.'
  },
  {
    question: 'Can I track my own recipes?',
    answer: 'Yes! Our recipe importer allows you to paste a link to any recipe online, and we will automatically calculate the nutritional information for you. You can also create and save your own custom foods and meals.'
  },
  {
    question: 'Is Calobite free to use?',
    answer: 'Calobite offers a robust free version with access to our entire food database and basic tracking features. We also offer a Premium subscription that unlocks advanced features like meal planning, detailed nutrient analysis, and ad-free browsing.'
  },
  {
    question: 'How do you calculate exercise calorie burn?',
    answer: 'We use the Metabolic Equivalent of Task (MET) formula, which is a standard method for estimating energy expenditure. The calculation takes into account the specific activity, its intensity, and your body weight to provide an accurate estimate.'
  },
];

export function FaqList() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {faqItems.map((item, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
