import React from "react";
import * as Slider from "@radix-ui/react-slider";

const SnippetSlider = ({
  endTimeSeconds,
  maxTimeSeconds,
  setStartTimeSeconds,
  setEndTimeSeconds,
}) => {
  const handleSliderChange = (v) => {
    setStartTimeSeconds(v[0]);
    setEndTimeSeconds(v[1]);
  };
  return (
    <Slider.Root
      className="relative flex h-[20px] w-4/5 touch-none select-none items-center"
      defaultValue={[0, endTimeSeconds]}
      onValueChange={(v) => handleSliderChange(v)}
      min={0}
      max={maxTimeSeconds}
      step={1}
      minStepsBetweenThumbs={1}
      aria-label="Volume"
    >
      <Slider.Track className="relative h-2 flex-grow rounded-full bg-slate-200  dark:bg-dark">
        <Slider.Range className="absolute h-full rounded-[9999px] bg-darker dark:bg-lighter" />
      </Slider.Track>
      <Slider.Thumb className="block h-5 w-5 cursor-grab rounded-lg border-2 border-darker bg-lightest shadow-lg focus:shadow-lg focus:outline-none dark:border-light dark:bg-light" />
      <Slider.Thumb className="block h-5 w-5 cursor-grab rounded-lg border-2 border-darker bg-lightest shadow-lg focus:shadow-lg focus:outline-none dark:border-light dark:bg-light" />
    </Slider.Root>
  );
};

export default SnippetSlider;