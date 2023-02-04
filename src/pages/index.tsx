import { useRouter } from "next/router";
import useSWR from "swr";
import { API_ENDPOINTS } from "~/constants/API";
import fetcher from "~/helpers/fetcher";

function Index() {
  const { data } = useSWR(API_ENDPOINTS.user, fetcher);
  const router = useRouter();

  if (data) {
    router.push("/dashboard");
  }

  return <h1>Hey</h1>;
}

export default Index;
