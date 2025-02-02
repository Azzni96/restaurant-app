import { Link, Outlet } from 'react-router-dom';

const Layout = () => {


  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/restaurants">Restaurants</Link>
                </li>



                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/forgot-password">Forgot Password</Link>
                </li>

          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
