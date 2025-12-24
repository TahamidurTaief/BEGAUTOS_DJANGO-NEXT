import { useState } from "react";

const YouTubeOverlay = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const videoUrl = "https://www.youtube.com/watch?v=GozpOBjAE-w";
  const videoId = getYouTubeVideoId(videoUrl);

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <div className=" relative h-20">
      {/* Your existing button structure */}

      <button
        onClick={openVideo}
        className="flex items-center gap-2 sm:gap-3 bg-[url('/images/video-button.png')] bg-cover bg-center bg-no-repeat transition hover:scale-105 px-7 sm:px-7 lg:px-8 py-3.5 sm:py-3.5 lg:py-4 rounded-full cursor-pointer text-base sm:text-lg"
      >
        <div className="h-6 w-6 sm:h-8 sm:w-8 lg:h-8 lg:w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <span className="text-white text-[16px] sm:text-sm lg:text-base font-medium whitespace-nowrap">
          See Video
        </span>
      </button>

      {/* Video Overlay Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl max-w-4xl w-full mx-4">
            {/* Close button */}
            <button
              onClick={closeVideo}
              className="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* YouTube iframe */}
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Click outside overlay to close */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-40" onClick={closeVideo}></div>
      )}
    </div>
  );
};

export default YouTubeOverlay;
