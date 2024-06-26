'use client'

import { cancelApplication } from "@/actions/application"
import { useToast } from "@/components/ui/use-toast"

export default function CancelApplicationButton({applicationId}: {applicationId: number}) {
    const {toast} = useToast()
    const handleCancelApplication = async () => {
      const result = await cancelApplication(applicationId)
      toast({
        title: "Application Canceled",
        description: "Your application has been canceled.",
        variant: "success",
      })
      if(result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "error",
        })
      }
  }
    return (
    <button onClick={handleCancelApplication} className="text-red-600">Cancel Application</button>
  )
}
