import { useQuery } from "@apollo/client";
import { useCallback, useMemo, useState } from "react";
import { PaginatedAssets } from "../types";
import { GET_ASSETS } from "../api/gql";
import { getClient } from "../api/client";

/**
 * A react Hook for filtering and paginating assets from the server
 * @param $page page index
 * @param $limit items per page 
 * @param filters mongodb query filters
 * @returns 
 */
const useAssets = ($page = 0, $limit = 10, filters=undefined) => {

  const [page, setPage] = useState($page);
  const [limit, setLimit] = useState($limit);
  const { loading, data, previousData, refetch } = useQuery<{ assets: PaginatedAssets }>(
    GET_ASSETS, {
      variables: {
        limit: limit,
        skip: page * limit,
        filters
      },
      client: getClient().gql
    }
  )

  const resolvedData = useMemo(
    () => data || previousData,
    [data, previousData]
  )

  const pages_count = useMemo(
    () => {
      return resolvedData ? Math.ceil(resolvedData?.assets?.count / limit) : 0;
    }, [resolvedData, limit]
  )

  const items_count = useMemo(
    () => resolvedData ? resolvedData.assets.count : 0
    , [resolvedData]
  )

  const previous = useCallback(
    () => {
      setPage(ix => Math.max(ix-1, 0))
    }, []
   )
 
  const next = useCallback(
   () => {
    setPage(ix => Math.min(ix+1, pages_count-1))
    }, [pages_count]
  )

  return {
    pages_count, items_count, page, loading, resolvedData,
    previous, next
  }
}

export default useAssets;