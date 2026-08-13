import { Link } from "react-router";
import { ROUTES } from "@/routes/routes";

export default function Header() {
  return (
    <header className="flex items-center gap-6">
      <h1 className="text-xl font-bold">CoPy</h1>
      <nav className="flex gap-4">
        <Link to={ROUTES.HOME}>Home</Link>
        <Link to={ROUTES.TEST}>Test</Link>
        <Link to={ROUTES.STATUS}>Status</Link>
      </nav>
    </header>
  );
}
