import { Link } from "react-router-dom";

export default function User() {
  return (
    <div className="h-screen">
      <ul>
        <li>
          <Link to={"1"}>user 1</Link>
        </li>
        <li>
          <Link to={"2"}>user 2</Link>
        </li>
      </ul>
    </div>
  );
}
