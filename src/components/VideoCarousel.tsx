import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { type SyntheticEvent, useEffect, useRef, useState } from "react";
gsap.registerPlugin(ScrollTrigger);

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
    const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
    const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
    const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const [loadedData, setLoadedData] = useState<SyntheticEvent<HTMLVideoElement, Event>[]>([]);
    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

    // 1. Trigger initial autoplay only ONCE when scrolling into view
    useGSAP(() => {
        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none",
            },
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true,
                }));
            },
        });
    }, []);

    // 2. Slide horizontally whenever videoId changes
    useGSAP(() => {
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 1.5,
            ease: "power2.inOut",
        });
    }, [isEnd, videoId]);

    useEffect(() => {
        let currentProgress = 0;
        const span = videoSpanRef.current;

        if (span[videoId] && isPlaying) {
            const anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);

                    if (progress != currentProgress) {
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760 ? "10vw" : window.innerWidth < 1200 ? "10vw" : "4vw",
                        });

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: "white",
                        });
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: "12px",
                        });
                        gsap.to(span[videoId], {
                            backgroundColor: "#afafaf",
                        });
                    }
                },
            });

            if (videoId == 0) {
                anim.restart();
            }

            const animUpdate = () => {
                const currentVideo = videoRef.current[videoId];
                if (currentVideo) {
                    anim.progress(currentVideo.currentTime / hightlightsSlides[videoId].videoDuration);
                }
            };

            gsap.ticker.add(animUpdate);

            return () => {
                gsap.ticker.remove(animUpdate);
                anim.kill();
            };
        }
    }, [videoId, startPlay, isPlaying]);

    useEffect(() => {
        if (loadedData.length > 3) {
            const currentVideo = videoRef.current[videoId];
            if (!currentVideo) return;

            if (!isPlaying) {
                currentVideo.pause();
            } else if (startPlay) {
                currentVideo.play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    const handleProcess = (type: string, i?: number) => {
        switch (type) {
            case "video-end":
                setVideo((pre) => ({ ...pre, isEnd: true, videoId: (i ?? 0) + 1 }));
                break;

            case "video-last":
                if (videoDivRef.current[videoId]) {
                    gsap.to(videoDivRef.current[videoId], { width: "12px", duration: 0.3 });
                }
                if (videoSpanRef.current[videoId]) {
                    gsap.to(videoSpanRef.current[videoId], { backgroundColor: "#afafaf", duration: 0.3 });
                }
                setVideo((pre) => ({ ...pre, isLastVideo: true, isPlaying: false }));
                break;

            case "video-reset":
                videoRef.current.forEach((vid) => {
                    if (vid) vid.currentTime = 0;
                });
                setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false, isPlaying: true }));
                break;

            case "video-select": {
                const targetIndex = i ?? 0;
                const expandedWidth = window.innerWidth < 760 ? "10vw" : window.innerWidth < 1200 ? "10vw" : "4vw";

                videoRef.current.forEach((vid, idx) => {
                    if (vid) {
                        vid.pause();
                        if (idx === targetIndex && vid.currentTime === 0) {
                            vid.currentTime = 0.5;
                        }
                    }

                    if (videoDivRef.current[idx]) {
                        gsap.killTweensOf(videoDivRef.current[idx]);
                        gsap.to(videoDivRef.current[idx], {
                            width: idx === targetIndex ? expandedWidth : "12px",
                            duration: 0.3,
                        });
                    }
                    if (videoSpanRef.current[idx]) {
                        gsap.killTweensOf(videoSpanRef.current[idx]);
                        gsap.to(videoSpanRef.current[idx], {
                            width: "100%",
                            backgroundColor: idx === targetIndex ? "#86868b" : "#afafaf",
                            duration: 0.3,
                        });
                    }
                });

                setVideo((pre) => ({
                    ...pre,
                    videoId: targetIndex,
                    isLastVideo: false,
                    isPlaying: false,
                }));
                break;
            }

            case "pause":
                setVideo((pre) => ({ ...pre, isPlaying: false }));
                break;

            case "play": {
                const currentVideo = videoRef.current[videoId];
                // If the selected video had already finished, restart it from 0 when user hits Play
                if (currentVideo && currentVideo.ended) {
                    currentVideo.currentTime = 0;
                }
                setVideo((pre) => ({ ...pre, isPlaying: true }));
                break;
            }

            default:
                return video;
        }
    };

    const handleLoadedMetaData = (e: SyntheticEvent<HTMLVideoElement, Event>) => setLoadedData((pre) => [...pre, e]);

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    id="video"
                                    playsInline={true}
                                    className={`${list.id === 2 && "translate-x-44"} pointer-events-none`}
                                    preload="auto"
                                    muted
                                    ref={(el) => {
                                        videoRef.current[i] = el;
                                    }}
                                    onEnded={() => (i !== 3 ? handleProcess("video-end", i) : handleProcess("video-last"))}
                                    onPlay={() => setVideo((pre) => ({ ...pre, isPlaying: true }))}
                                    onLoadedMetadata={(e) => handleLoadedMetaData(e)}
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>

                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text, idx) => (
                                    <p key={idx} className="md:text-2xl text-xl font-medium">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {hightlightsSlides.map((slide, i) => (
                        <button
                            key={slide.id}
                            type="button"
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => handleProcess("video-select", i)}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer overflow-hidden"
                            ref={(el) => {
                                videoDivRef.current[i] = el;
                            }}
                        >
                            <span
                                className="absolute left-0 top-0 h-full w-full rounded-full"
                                ref={(el) => {
                                    videoSpanRef.current[i] = el;
                                }}
                            />
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    className="control-btn cursor-pointer p-0! w-13 h-13"
                    onClick={
                        isLastVideo ? () => handleProcess("video-reset") : !isPlaying ? () => handleProcess("play") : () => handleProcess("pause")
                    }
                >
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                        className="w-14 h-14"
                    />
                </button>
            </div>
        </>
    );
};

export default VideoCarousel;
