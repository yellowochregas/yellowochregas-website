import { useParams } from "react-router-dom";
import AssistantFlow from "../components/AssistantFlow";

export default function AssistantPage() {
  const { issueId = "not-sure" } = useParams();
  return <AssistantFlow issueId={issueId} />;
}
