import { Outlet, LiveReload, Link, Links, Meta } from '@remix-run/react';
import globalStylesUrl from '~/styles/globals.css';

// Utilize links across all components
export const links = () => [{ rel: 'stylesheet', href: globalStylesUrl }];

// Utilize meta across all components
export const meta = () => {
  const description = 'A cool blog built with Remix';
  const keywords = 'remix, react';

  return [
    {
      description,
      keywords,
    },
  ];
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// Default document styles for all components
function Document({ children, title }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
        <title>{title ? title : 'Remix Blog'}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  );
}

// Layout function to maintain consistency
function Layout({ children }) {
  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='logo'>
          Remix
        </Link>

        <ul className='nav'>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
        </ul>
      </nav>
      <div className='container'>{children}</div>
    </>
  );
}

export function ErrorBoundary({ error }) {
  console.log(error);
  return (
    <Document>
      <Layout>
        <div>
          <h1>Error</h1>
          <p>{error.message}</p>
        </div>
      </Layout>
    </Document>
  );
}
