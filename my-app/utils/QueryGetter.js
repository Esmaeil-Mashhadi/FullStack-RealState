import { useQuery } from "@tanstack/react-query"

export const queryData = (posterFetch)=>{
    const {data , isLoading} = useQuery({queryKey:["posters"] , queryFn :posterFetch })
    return {data , isLoading}
}
