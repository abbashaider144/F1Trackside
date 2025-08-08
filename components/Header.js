import { useRouter } from 'next/router';
import { NAV_ITEMS } from '../constants/constants';
import Image from 'next/image';
import F1Logo from '../assets/F1TracksideLogo.png';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white border-b-2 border-red-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <Image 
                src={F1Logo}
                alt="F1 Trackside" 
                width={120} 
                height={40}
                className="h-8 w-auto"
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-1">
            {NAV_ITEMS.map((item) => {
              const isActive = router.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className={`
                    px-4 py-2 rounded font-f1-speed transition-all duration-200
                    ${isActive 
                      ? 'bg-red-700 text-white' 
                      : 'text-gray-700 hover:text-red-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
} 