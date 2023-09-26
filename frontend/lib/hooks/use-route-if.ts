import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"

/**
 * A React Hook to change navigation if a condition is met
 * @param condition {boolean} condition
 * @param path 
 */
const useNavigateIfTrue = (condition: boolean, path: string) => {
  const router = useRouter()

  useEffect(
    () => {
      if(condition)
        router.push(path)
    }, [condition, path, router]
  )
}

export default useNavigateIfTrue;