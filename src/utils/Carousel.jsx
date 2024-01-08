import { useState } from "react";
const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const previous = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(images.length - 1);
    }
  };
  const forward = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  return (
    <div className="flex  justify-center">
      <div className="flex relative mx-auto max-w-2xl overflow-hidden rounded-md bg-gray-100 ">
        <div className="absolute right-5 top-5 z-10 rounded-full bg-gray-600 px-2 text-center text-sm text-white">
          <span x-text={currentIndex + 1}></span>/
          <span x-text={images && images.length}></span>
        </div>

        <button
          type="button"
          onClick={() => previous()}
          className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md"
        >
          <i className="fas fa-chevron-left text-2xl font-bold text-gray-500"></i>
        </button>

        <button
          type="button"
          onClick={() => forward()}
          className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md"
        >
          <i className="fas fa-chevron-right text-2xl font-bold text-gray-500"></i>
        </button>

        <div className="relative h-80 w-96">
          <div
            x-transition:enter="transition transform duration-300"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            x-transition:leave="transition transform duration-300"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
            className="absolute top-0 h-full w-full"
          >
            <img
              src={images && images[currentIndex].url}
              alt="image"
              className="h-full w-full rounded-sm"
            />
          </div>

          {/* <template x-for="(image, index) in images">
                    <div x-show="currentIndex == index + 1" x-transition:enter="transition transform duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition transform duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" className="absolute top-0">
                        <img src="image" alt="image" className="rounded-sm" />
                    </div>
                </template> */}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
