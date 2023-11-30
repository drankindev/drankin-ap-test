import { Outlet } from "react-router-dom";
import CategoriesList from './CategoriesList'

const Layout = () => {
    return (
        <>              
            <div className="flex text-left pt-24 bg-blue-50 min-h-screen">
                <nav className="fixed z-40 hidden md:block flex-initial w-44 m-8 lg:w-56 rounded p-4 bg-white">
                    <CategoriesList />
                </nav>
                <section className="md:pl-52 lg:pl-56 my-8 mx-8 pb-24 md:mx-auto w-auto max-w-4xl">
                    <Outlet/>
                </section>
            </div>
       </>
    )
}

export default Layout;