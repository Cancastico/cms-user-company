import { Card } from "@/components/ui/card"

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-64 h-64 flex items-center justify-center bg-white shadow-lg">
        <div className="relative w-20 h-20 flex items-end gap-5">
          <svg className="animate-spin h-full w-full" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 bg-primary rounded-full animate-ping"></div>
          </div>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
      </Card>
    </div>
  )
}