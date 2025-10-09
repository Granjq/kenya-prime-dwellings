import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I start the home buying process?",
    answer: "Start by getting pre-approved for a mortgage to understand your budget. Then, browse our property listings, schedule viewings, and work with one of our expert agents to find your perfect home. We'll guide you through every step from offer to closing."
  },
  {
    question: "What documents do I need to buy a property?",
    answer: "You'll typically need proof of identity (passport/ID), proof of income (pay slips, tax returns), bank statements, proof of address, and employment verification. Our agents will provide you with a complete checklist tailored to your situation."
  },
  {
    question: "How long does the property buying process take?",
    answer: "The timeline varies, but typically takes 8-12 weeks from offer acceptance to completion. This includes property searches, surveys, mortgage approval, and legal processes. We work diligently to ensure a smooth and timely transaction."
  },
  {
    question: "What are the additional costs when buying a property?",
    answer: "Beyond the purchase price, expect costs like stamp duty, legal fees, survey fees, mortgage arrangement fees, and moving costs. Budget approximately 3-5% of the property price for these additional expenses."
  },
  {
    question: "Can I view properties virtually?",
    answer: "Yes! We offer virtual tours and video walkthroughs for most properties. You can also schedule in-person viewings at your convenience. Our agents are available to answer questions during both virtual and physical tours."
  },
  {
    question: "How do I know if a property is a good investment?",
    answer: "Consider location, property condition, local market trends, rental potential, and future development plans in the area. Our agents provide detailed market analysis and investment advice to help you make informed decisions."
  }
];

export function FAQSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about buying, renting, and investing in real estate
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="text-base md:text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            Contact our support team
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
