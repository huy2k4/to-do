import { Link } from 'react-router-dom';

const Navbar = ({ isNavOpen, setIsNavOpen }) => {
    return (
        <nav className={`nav-bar ${isNavOpen ? 'open' : ''}`}>
            <ul className="nav-list">
                <li>
                    <Link to="/" className="nav-item" onClick={() => setIsNavOpen(false)}>
                        Todolist
                    </Link>
                </li>
                {/* <li>
          <Link to="/stats" className="nav-item" onClick={() => setIsNavOpen(false)}>
            Thống kê
          </Link>
        </li>
        <li>
          <Link to="/team" className="nav-item" onClick={() => setIsNavOpen(false)}>
            Đội nhóm
          </Link>
        </li> */}
            </ul>
        </nav>
    );
};

export default Navbar;