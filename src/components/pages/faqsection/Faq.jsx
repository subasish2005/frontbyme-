// eslint-disable-next-line no-unused-vars
import React from 'react';
import { AccordionItem } from './AccordionItem';
import styles from './Faq.module.css';

const faqData = [
  {
    question: "What is this tool?",
    answer: "Our community development tool is designed to enhance user engagement and interaction. It features task-based point systems and badges to reward participation. Users can connect with friends and share achievements seamlessly."
  },
  {
    question: "How do I earn points?",
    answer: "Points are earned by completing various tasks within the platform. Each task has a specific point value based on its complexity. The more you engage, the more points you accumulate!"
  },
  {
    question: "What are badges?",
    answer: "Badges are digital awards that recognize your achievements on the platform. They are displayed on your profile, showcasing your contributions and engagement. Collecting badges adds a fun and competitive element to your experience."
  },
  {
    question: "Can I connect with friends?",
    answer: "Absolutely! Our tool allows you to connect with friends and build a community. You can share your badges and achievements, fostering a collaborative environment."
  },
  {
    question: "Are there giveaways?",
    answer: "Yes, we host regular giveaways for our users! The more points you earn, the better your chances of winning exciting prizes. Stay active and keep an eye out for announcements!"
  }
];

export const Faq = () => {
  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h1 className={styles.mainHeading}>FAQs</h1>
          <p className={styles.headerText}>
            Find answers to your most pressing questions about our community development tool.
          </p>
        </header>

        <div className={styles.accordionList}>
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

        <div className={styles.contactSection}>
          <div className={styles.contactContent}>
            <h2 className={styles.contactHeading}>Still have questions?</h2>
            <p className={styles.contactText}>We are here to help you!</p>
          </div>
          <div className={styles.actionWrapper}>
            <button className={styles.contactButton}>Contact</button>
          </div>
        </div>
      </div>
    </section>
  );
};