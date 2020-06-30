import Header from './header.js';
function Layout({ children }) {
    return <>
    <div className='wrapper'>
        <div>
          <Header />
        </div>
        <div>
          {children}
        </div>
        <div></div>
      </div>
      </>
  }
  
  export default Layout