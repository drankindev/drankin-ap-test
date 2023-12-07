const Footer = () => {
    const today = new Date();
    return(
        <footer className="w-full sm:fixed z-50 bottom-0 px-6 py-1 bg-slate-400 text-right">
            <p className="text-xs">&copy; {today.getFullYear()} David Rankin</p>
        </footer>
    )
}

export default Footer;