import { Outlet } from "react-router-dom";
import TagList from './common/TagList'

const Layout = () => {
    
    return (
        <>              
            <div className="flex text-left pt-24 bg-blue-50 min-h-screen">
                <nav className="fixed z-40 flex-initial w-44 m-8 rounded p-4 bg-white">
                    <TagList />
                </nav>
                <section className="my-8 py-8 pl-56 mx-auto w-auto max-w-6xl">
                    <Outlet/>
                </section>
            </div>
       </>
    )
}

export default Layout;