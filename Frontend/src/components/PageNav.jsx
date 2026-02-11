import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/features">Features</NavLink>
        </li>
        <li>
          <NavLink to="/nutriscan">NutriScan</NavLink>
        </li>
        <li>
          <NavLink to="/prepare-ai">Prepare-AI</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
