const Feature = ({ icon: Icon, title, description, children }) => {
    return (
        <div className="bg-[#0d172a] p-8 rounded-3xl border border-[#1f293a] hover:border-[#38bdf8] transition-colors group">
            <Icon className="text-[#38bdf8] w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-[#94a3b8] mb-4">{description}</p>
            {children}
        </div>
    );
}
export default Feature;