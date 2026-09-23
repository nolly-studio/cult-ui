import ThreeDPhotoCarousel from "../ui/three-d-carousel";

export default function ThreeDPhotoCarouselDemo() {
  return (
    <div className="w-full max-w-4xl">
      <div className="flex min-h-[500px] flex-col justify-center space-y-4 rounded-lg border border-dashed">
        <div className="p-2">
          <ThreeDPhotoCarousel />
        </div>
      </div>
    </div>
  );
}
