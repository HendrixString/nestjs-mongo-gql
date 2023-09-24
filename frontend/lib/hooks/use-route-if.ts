import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"

const useNavigateIfTrue = (condition: boolean, path: string) => {
  const router = useRouter()
  useEffect(
    () => {
      if(condition)
        router.push(path)
      // get cached user
    }, [condition, path, router]
  )
  
}

export default useNavigateIfTrue;