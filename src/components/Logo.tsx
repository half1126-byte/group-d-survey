import Image from "next/image";

export default function Logo() {
    return (
        <div className="absolute top-6 left-6 z-[60]">
            {/* Fallback to text if image not loaded, or simply use img tag to avoid next/image strict config if external */}
            <img
                src="/group-d_logo.jpg"
                alt="Group D Logo"
                className="h-10 w-auto object-contain rounded-full shadow-md border-2 border-white/10"
                onError={(e) => {
                    e.currentTarget.style.display = 'none'; // Hide if not found
                    // Maybe show text fallback?
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                        // Quick fallback text inject? No, React controls DOM.
                        // Just rely on the container having text if needed.
                    }
                }}
            />
        </div>
    );
}
