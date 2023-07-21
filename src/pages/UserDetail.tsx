import { useParams } from "react-router-dom";

export default function UserDetail() {
  const userId = useParams();
  console.log(userId);
  return (
    <div className="flex">
      <div>User Detail</div>
    </div>
  );
}
