import { useCallback, useEffect, useState } from "react"

const useUser = () => {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(
    () => {
      // get cached user
    }, []
  )

  const login = useCallback(
    async (email: string, password: string) => {
      // goto api
    }, []
  )

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      // goto api
    }, []
  )

  return {
    loading, user, login, signup
  }
}

export default useUser;