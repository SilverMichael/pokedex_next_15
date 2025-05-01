'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavBar() {
    const pathname = usePathname()
    const activeTab = pathname === '/favourites' ? 'favourites' : 'pokedex'

    const showNavBar = ['/', '/favourites'].includes(pathname)

    if (!showNavBar) {
        return null
    }

    return (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <nav className="container mx-auto">
                <ul className="flex">
                    <li className="flex-1">
                        <Link
                            href="/"
                            className={`w-full block py-4 px-6 text-center font-medium transition-all duration-300 relative
                ${activeTab === 'pokedex' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Pokédex
                            {activeTab === 'pokedex' && (
                                <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></span>
                            )}
                        </Link>
                    </li>
                    <li className="flex-1">
                        <Link
                            href="/favourites"
                            className={`w-full block py-4 px-6 text-center font-medium transition-all duration-300 relative
                ${activeTab === 'favourites' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Favoris
                            {activeTab === 'favourites' && (
                                <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></span>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}