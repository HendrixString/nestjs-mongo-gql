import { useCallback, useEffect, useState } from "react"
import { getClient } from "@/lib/api/client"
import { User } from "@/lib/types"

const useUser = () => {
  // const [user, setUser] = useState<User>(getClient()?.auth?.user)
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(
    () => {
      setLoading(true)
      setUser(getClient()?.auth?.user)
      setLoading(false);

      return getClient().auth.subscribe(
        (u: User) => {
          console.log('sub ', u)
          setUser(u);
        }
      )
      
    }, [getClient()]
  )

  const logout = useCallback(
    async () => {
      return getClient().auth.logout()
    }, []
  )

  const login = useCallback(
    async (email: string, password: string) => {
      return getClient().auth.login(email, password)
    }, []
  )

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      return getClient().auth.signup(name, email, password)
    }, []
  )

  return {
    loading, user, login, signup, logout
  }
}

export default useUser;