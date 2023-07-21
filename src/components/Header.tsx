import { Link, useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const onAboutClick = () => {
    navigate("/user");
  };
  return (
    <header>
      <ul className="flex p-8">
        <li className="p-4">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="p-4">
          <button onClick={onAboutClick}>User</button>
        </li>
        <li className="p-4">
          <Link to={"/coin"}>Coin</Link>
        </li>
      </ul>
    </header>
  );
}
export default Header;
