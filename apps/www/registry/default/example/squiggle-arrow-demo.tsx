import SquigglyArrow from "@/registry/default/ui/squiggle-arrow"

function SquigglyArrowDemo() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 ">
      <div className="flex flex-col gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center">Variants</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="w-24 text-foreground">Wavy</span>
              <SquigglyArrow variant="wavy" />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-foreground">Bouncy</span>
              <SquigglyArrow variant="bouncy" className="text-blue-500" />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-foreground">Smooth</span>
              <SquigglyArrow variant="smooth" className="text-purple-600" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center">Directions</h2>
          <div className="flex flex-wrap gap-8 justify-center p-4">
            <div className="flex flex-col items-center gap-2">
              <span className="text-foreground">Right</span>
              <SquigglyArrow direction="right" className="text-green-600" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-foreground">Left</span>
              <SquigglyArrow direction="left" className="text-orange-600" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-foreground">Down</span>
              <SquigglyArrow direction="down" className="text-pink-600" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-foreground">Up</span>
              <SquigglyArrow direction="up" className="text-cyan-600" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center">Sizes</h2>
          <div className="flex items-center gap-8 overflow-x-auto p-4">
            <SquigglyArrow width={150} height={75} strokeWidth={2} />
            <SquigglyArrow
              width={250}
              height={125}
              strokeWidth={3}
              className="text-blue-500"
            />
            <SquigglyArrow
              width={300}
              height={150}
              strokeWidth={4}
              className="text-purple-600"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default SquigglyArrowDemo
