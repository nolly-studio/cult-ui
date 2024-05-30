import BackgroundMedia from "../ui/bg-media"

export default function BgMediaDemo() {
  return (
    <div className="w-full ">
      <div className="md:min-w-[20rem] ">
        <BackgroundMedia
          type="video"
          variant="light"
          src="https://openaicomproductionae4b.blob.core.windows.net/production-twill-01/c74791d0-75d2-48e6-acae-96d13bc97c56/paper-planes.mp4"
        />
      </div>
    </div>
  )
}
