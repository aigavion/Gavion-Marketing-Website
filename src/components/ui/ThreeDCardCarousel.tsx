"use client"

import { useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

type Step = {
  number: string
  titleKey: string
  descKey: string
}

type ThreeDCardCarouselProps = {
  steps: Step[]
}

export function ThreeDCardCarousel({ steps }: ThreeDCardCarouselProps) {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const controls = useAnimation()

  const goToStep = (index: number) => {
    const targetOffset = -index * 100
    controls.start({
      x: `${targetOffset}%`,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30,
        mass: 0.5,
      },
    })
    setActiveIndex(index)
  }

  const goToPrevious = () => {
    const newIndex = activeIndex === 0 ? steps.length - 1 : activeIndex - 1
    goToStep(newIndex)
  }

  const goToNext = () => {
    const newIndex = activeIndex === steps.length - 1 ? 0 : activeIndex + 1
    goToStep(newIndex)
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-16 z-10 w-14 h-14 rounded-full bg-dark-800 border-2 border-brand-500 flex items-center justify-center text-brand-500 hover:bg-brand-500 hover:text-dark-800 transition-all duration-300"
        aria-label="Previous step"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-16 z-10 w-14 h-14 rounded-full bg-dark-800 border-2 border-brand-500 flex items-center justify-center text-brand-500 hover:bg-brand-500 hover:text-dark-800 transition-all duration-300"
        aria-label="Next step"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="overflow-hidden px-4">
        <motion.div
          className="flex"
          animate={controls}
          initial={{ x: "0%" }}
        >
          {steps.map((step, i) => (
            <div
              key={`step-${i}`}
              className="w-full flex-shrink-0 px-4"
            >
              <div className="bg-dark-800 rounded-3xl p-10 border-2 border-brand-500">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-brand-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => goToStep(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-10 bg-brand-500"
                : "w-3 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
