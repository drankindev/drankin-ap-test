const Footer = () => {
    const today = new Date();
    return(
        <footer className="w-full sm:fixed z-50 bottom-0 px-6 py-1 bg-slate-800 text-right">
            <p className="text-xs text-white">&copy; {today.getFullYear()} David Rankin</p>
        </footer>
    )
}

export default Footer;