import React from "react";
import * as Slider from "@radix-ui/react-slider";

const SnippetSlider = ({
  startTimeSeconds,
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
      defaultValue={[0, maxTimeSeconds]}
      onValueChange={(v) => handleSliderChange(v)}
      min={0}
      max={maxTimeSeconds}
      step={1}
      minStepsBetweenThumbs={1}
      aria-label="Volume"
    >
      <Slider.Track className="relative h-2 flex-grow rounded-full bg-dark  dark:bg-lighter">
        <Slider.Range className="absolute h-full rounded-[9999px] bg-brand" />
      </Slider.Track>
      <Slider.Thumb className="block h-5 w-5 cursor-grab rounded-lg  bg-dark shadow-lg focus:shadow-lg focus:outline-none dark:bg-light" />
      <Slider.Thumb className="block h-5 w-5 cursor-grab rounded-lg bg-dark shadow-lg focus:shadow-lg focus:outline-none dark:bg-light" />
    </Slider.Root>
  );
};

export default SnippetSlider;
