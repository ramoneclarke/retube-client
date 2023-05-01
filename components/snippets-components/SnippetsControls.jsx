import useRefetchingSession from "@/hooks/useRefetchingSession";
import { formatTimeFromSeconds } from "@/utils/formatTimeFromSeconds";
import { motion } from "framer-motion";
import React from "react";
import InfoTooltip from "../InfoTooltip";
import SnippetSlider from "./SnippetSlider";

const SnippetsControls = ({
  startTimeSeconds,
  endTimeSeconds,
  setStartTimeSeconds,
  setEndTimeSeconds,
  videoDuration,
  videoId,
  snippetMutation,
  setNewSnippetWindowOpen,
}) => {
  const { data: session, status, update } = useRefetchingSession();

  console.log(session);

  const handleClick = () => {
    if (videoId && videoDuration > 0) {
      snippetMutation.mutate({
        id: videoId,
        start: startTimeSeconds,
        end: endTimeSeconds,
        token: session.accessToken,
      });
      setNewSnippetWindowOpen(true);
    }
  };

  return (
    <div className="mb-12 flex w-4/5 flex-col items-center gap-y-8 rounded-xl bg-lightest p-8 shadow-md dark:bg-darker">
      <div className="flex w-full flex-col items-center gap-2">
        {/* Controls */}
        <div className="mb-4 flex  h-14 w-60 flex-row items-center justify-center gap-4 rounded-xl bg-slate-200 text-2xl font-medium dark:bg-light">
          {/* Snippet details view */}
          <p className="text-darker dark:text-darker">
            {formatTimeFromSeconds(startTimeSeconds)}
          </p>
          <p className="text-darker dark:text-darker">-</p>
          <p className="text-darker dark:text-darker">
            {formatTimeFromSeconds(endTimeSeconds)}
          </p>
        </div>
        <div className="flex w-full flex-row items-center justify-start gap-2">
          {/* Start */}
          <InfoTooltip />
          <p className="w-[14%] text-base font-normal text-slate-400">
            Snippet time:{" "}
          </p>
          <SnippetSlider
            endTimeSeconds={endTimeSeconds}
            maxTimeSeconds={videoDuration}
            setStartTimeSeconds={setStartTimeSeconds}
            setEndTimeSeconds={setEndTimeSeconds}
          />
          <motion.button
            onClick={handleClick}
            className="h-12 w-24 rounded-xl bg-brand font-medium text-darkest shadow-md dark:bg-brand"
            whileTap={{
              scale: 0.9,
            }}
          >
            Snip
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SnippetsControls;