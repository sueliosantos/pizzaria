import { useContext } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import { Nav } from "react-bootstrap";

export function Header() {
  const { singOut } = useContext(AuthContext);
  return (
    <header>
      <div>
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/dashboard">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/categoria">Categoria</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </header>
  );
}
