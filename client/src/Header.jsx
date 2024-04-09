import {useState, useEffect} from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import {useSelector} from 'react-redux';

const Header = () => {
    const {currentUser} = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('searchTerm', searchTerm);
            const searchQuery = urlParams.toString();
            navigate(`/search?${searchQuery}`);
            
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search])



  return (
    <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>Real</span>
        <span className='text-slate-700'>Estate.Org</span>
    </h1>
    </Link>

    <form onSubmit={handleSubmit} className='hidden bg-slate-100 p-3 rounded-lg flex items-center'>
<input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-16 sm:w-64'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />

    <button>
        <FaSearch className='text-slate-600' />
        </button>

    </form>
    <ul className='flex gap-4'>
        <Link to='/'> 
        <li className=' sm:inline text-slate-700 hover:underline text-2xl'><IoIosHome />
</li>
        </Link>

        <Link to='/about'>
        <li className=' sm:inline text-slate-700 hover:underline text-2xl'><FcAbout className='text-slate-600 bg-brown'/>
        </li>
        </Link>
        <Link to='/profile'>
        {currentUser ? (
            
        <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>
            
        ): <li className='hidden sm:inline text-slate-700 hover:underline'>Sign In</li>   
        }
        </Link>
        
    </ul>
    </div>
   </header>
  )
}

export default Header