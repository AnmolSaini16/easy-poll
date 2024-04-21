"use client";

export default function Error() {
  return (
    <div className="flex items-center flex-col h-full space-y-10">
      <div className="w-[480px]">
        <iframe
          src="https://giphy.com/embed/13GIAl4R21YLgQ"
          width="480"
          height="270"
          allowFullScreen
        ></iframe>
        <p>
          <a href="https://giphy.com/gifs/okkultmotionpictures-facebook-ko-13GIAl4R21YLgQ">
            via GIPHY
          </a>
        </p>
      </div>

      <h1 className="font-semibold text-xl">Try Refreshing...</h1>
    </div>
  );
}
