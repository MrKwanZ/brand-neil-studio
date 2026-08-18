"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function ContactContent() {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = reduceMotion === false;

  return (
    <div className="mx-auto grid max-w-4xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.2fr]">
      <div>
        <motion.h1
          variants={fadeUp}
          initial={shouldAnimate ? "hidden" : false}
          animate="visible"
          transition={{ duration: shouldAnimate ? 0.7 : 0, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl font-semibold md:text-4xl"
        >
          Let&apos;s talk
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial={shouldAnimate ? "hidden" : false}
          animate="visible"
          transition={{
            duration: shouldAnimate ? 0.7 : 0,
            delay: shouldAnimate ? 0.15 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-4 text-muted-foreground"
        >
          Whether you need a new web application, a rescue mission on an old one, or an extra pair
          of hands on your team — send a note and I&apos;ll reply personally.
        </motion.p>
      </div>

      <motion.div
        variants={fadeUp}
        initial={shouldAnimate ? "hidden" : false}
        animate="visible"
        transition={{
          duration: shouldAnimate ? 0.7 : 0,
          delay: shouldAnimate ? 0.3 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <ContactForm />
      </motion.div>
    </div>
  );
}
