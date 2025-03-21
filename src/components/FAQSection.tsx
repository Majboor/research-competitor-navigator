
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How accurate are the competitor listings?",
      answer: "Our algorithm uses advanced technology to identify your most relevant competitors based on your industry and location. We continuously refine our search methods to provide the most accurate results possible."
    },
    {
      question: "Can I search for competitors in multiple countries?",
      answer: "Yes, you can perform separate searches for different countries or regions to compare competitors across various markets."
    },
    {
      question: "Do you offer deeper competitor analysis?",
      answer: "Our basic service provides competitor discovery. For premium users, we offer additional insights including website traffic analysis, social media presence, and product/pricing comparisons."
    },
    {
      question: "How often is your competitor database updated?",
      answer: "Our database is continuously updated to ensure you have access to the most current market landscape. This includes new businesses and changes in existing competitor information."
    },
    {
      question: "Can I use this for local businesses?",
      answer: "Absolutely! CompetitorFinder is designed to work for businesses of all sizes, including local businesses. Simply specify your location to get relevant local competitors."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-neutral-600">
            Everything you need to know about CompetitorFinder
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-neutral-200">
              <AccordionTrigger className="text-lg font-medium py-4">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-neutral-600 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
