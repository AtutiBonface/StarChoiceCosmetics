import { Loader } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#F8F1E9]/50 backdrop-blur-[2px]">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-10 w-10 animate-spin text-accent-1" />
        <p className="text-sm font-medium text-[#333333]">Loading...</p>
      </div>
    </div>
  )
}
