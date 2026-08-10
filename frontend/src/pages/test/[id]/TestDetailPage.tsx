import { useParams, useSearchParams } from "react-router";

export default function TestEndpointPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <div className="text-4xl font-bold text-pink-500">
      Test id: {id}, page: {searchParams.get("page")}, pagesize: {searchParams.get("pagesize")}
    </div>
  );
}
