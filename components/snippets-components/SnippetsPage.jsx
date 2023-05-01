import { formatTimeFromSeconds } from "@/utils/formatTimeFromSeconds";
import { withAuth } from "@/utils/withAuth";
import React, { useState } from "react";
import YouTube from "react-youtube";
import Layout from "../layout-components/Layout";
import LinkActionButton from "../LinkActionButton";
import LinkInput from "../LinkInput";
import RecentSnippetsSection from "./RecentSnippetsSection";
import SnippetsControls from "./SnippetsControls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { extractVideoId } from "@/utils/handlers";
import Cookies from "js-cookie";
import { AnimatePresence } from "framer-motion";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import NewSnippetWindow from "./NewSnippetWindow";
import SnippetWindow from "./SnippetWindow";

const SnippetsPage = () => {
  const defaultEndTime = 60;
  const [startTimeSeconds, setStartTimeSeconds] = useState(0);
  const [endTimeSeconds, setEndTimeSeconds] = useState(defaultEndTime);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoId, setVideoId] = useState("");
  const [inputText, setInputText] = useState("");
  const [snippetWindowOpen, setSnippetWindowOpen] = useState(false);
  const [newSnippetWindowOpen, setNewSnippetWindowOpen] = useState(false);
  const [selectedSnippetData, setSelectedSnippetData] = useState(null);

  const { data: session } = useRefetchingSession();

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    ["snippets"],
    () => getSnippets(session.accessToken)
  );

  console.log(data);

  const snippetMutation = useMutation({
    mutationFn: (mutationArgs) => {
      const { id, start, end, token } = mutationArgs;
      return createSnippet(id, start, end, token);
    },
  });

  console.log(snippetMutation.data);

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: startTimeSeconds,
      end: endTimeSeconds,
      fs: 0,
    },
  };

  const setEndTimeToDuration = (e) => {
    const duration = e.target.getDuration();
    // setEndTimeSeconds(duration - 1);
    setEndTimeSeconds(defaultEndTime);
    setVideoDuration(duration - 1);
  };

  const handleLoadVideo = (url) => {
    const id = extractVideoId(url);
    if (id === "Invalid YouTube URL") {
      alert("Please enter a valid YouTube URL");
    } else {
      setVideoId(id);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex h-auto w-full flex-col items-center gap-8 pb-32">
          <div className="flex h-16 w-4/5 flex-row gap-2">
            <LinkInput inputText={inputText} setInputText={setInputText} />
            <LinkActionButton
              text="Load Video"
              handleLoadVideo={handleLoadVideo}
              inputText={inputText}
            />
          </div>
          <div className="flex h-fit min-h-[22.5rem] w-full justify-center">
            {videoId === "" ? (
              <div className="relative flex h-80 w-2/3 items-center justify-center overflow-hidden rounded-xl bg-gray-200 shadow-md dark:bg-darker">
                <div className="dark:tex h-fit w-fit text-xl font-normal text-gray-400">
                  {/* <Image src={YoutubePlayButton} alt="youtube play logo" /> */}
                  No video loaded
                </div>
              </div>
            ) : (
              <div className="relative flex w-auto items-center justify-center overflow-hidden rounded-xl">
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  className="flex"
                  onReady={(e) => setEndTimeToDuration(e)}
                  // style={{ width: "100%", height: "100%" }}
                />
              </div>
            )}
          </div>
          <SnippetsControls
            startTimeSeconds={startTimeSeconds}
            endTimeSeconds={endTimeSeconds}
            setStartTimeSeconds={setStartTimeSeconds}
            setEndTimeSeconds={setEndTimeSeconds}
            videoDuration={videoDuration}
            videoId={videoId}
            snippetMutation={snippetMutation}
            newSnippetWindowOpen={newSnippetWindowOpen}
            setNewSnippetWindowOpen={setNewSnippetWindowOpen}
          />
          <RecentSnippetsSection
            data={data}
            isLoading={isLoading}
            snippetWindowOpen={snippetWindowOpen}
            setSnippetWindowOpen={setSnippetWindowOpen}
            startTimeSeconds={startTimeSeconds}
            endTimeSeconds={endTimeSeconds}
            setSelectedSnippetData={setSelectedSnippetData}
          />
          <AnimatePresence>
            {newSnippetWindowOpen ? (
              <NewSnippetWindow
                snippetWindowOpen={newSnippetWindowOpen}
                setSnippetWindowOpen={setNewSnippetWindowOpen}
                snippetMutation={snippetMutation}
                startTimeSeconds={startTimeSeconds}
                endTimeSeconds={endTimeSeconds}
              />
            ) : null}
          </AnimatePresence>
          <AnimatePresence>
            {snippetWindowOpen ? (
              <SnippetWindow
                snippetWindowOpen={snippetWindowOpen}
                setSnippetWindowOpen={setSnippetWindowOpen}
                startTimeSeconds={startTimeSeconds}
                endTimeSeconds={endTimeSeconds}
                existingSnippetData={selectedSnippetData}
                setSelectedSnippetData={setSelectedSnippetData}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </Layout>
    </>
  );
};

const createSnippet = async (videoId, start, end, token) => {
  try {
    const csrftoken = Cookies.get("csrftoken");
    console.log("ACCESS TOKEN: ", token);
    const response = await fetch(
      `
        ${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/tools/text-snippet/
        `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          video_id: videoId,
          start: start,
          end: end,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getSnippets = async (token) => {
  try {
    const csrftoken = Cookies.get("csrftoken");
    const response = await fetch(
      `
          ${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/tools/text-snippet/
          `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default withAuth()(SnippetsPage);