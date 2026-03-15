'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RotatingText.css';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function RotatingText(props) {
  const {
    texts,
    index = 0,
    direction = 1, 
    transition = { type: 'spring', damping: 30, stiffness: 400 },
    animatePresenceMode = 'popLayout',
    staggerDuration = 0.025,
    staggerFrom = 'last',
    splitBy = 'characters',
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;


  const charVariants = {
    enter: (dir) => ({

      y: dir === 1 ? "150%" : "-150%",
      opacity: 0
    }),
    center: {
      y: "0%",
      opacity: 1
    },
    exit: (dir) => ({

      y: dir === 1 ? "-150%" : "150%",
      opacity: 0
    })
  };

  const splitIntoCharacters = text => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), segment => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[index];
    if (splitBy === 'characters') {
      const words = currentText.split(' ');
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1
      }));
    }
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1
    }));
  }, [texts, index, splitBy]);

  const getStaggerDelay = (idx, totalChars) => {
    const total = totalChars;
    if (staggerFrom === 'first') return idx * staggerDuration;
    if (staggerFrom === 'last') return (total - 1 - idx) * staggerDuration;
    return Math.abs(staggerFrom - idx) * staggerDuration;
  };

  return (
    <motion.span className={cn('text-rotate', mainClassName)} {...rest} layout transition={transition}>
      <span className="text-rotate-sr-only">{texts[index]}</span>
      
  
      <AnimatePresence mode={animatePresenceMode} custom={direction}>
        <motion.span
          key={index}
          custom={direction}
          className={cn(splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate')}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);
            return (
              <span key={wordIndex} className={cn('text-rotate-word', splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    custom={direction}       
                    variants={charVariants}  
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        previousCharsCount + charIndex,
                        array.reduce((sum, word) => sum + word.characters.length, 0)
                      )
                    }}
                    className={cn('text-rotate-element', elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}