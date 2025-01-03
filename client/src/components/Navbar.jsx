import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='p-4 shadow-lg'>
        <div className='flex max-w-7xl mx-auto px-4 justify-between items-center'>
        <Link to='/' className='text-2xl font-bold uppercase text-emerald-600'>Fitorify</Link>
        <Link to='/login' className='btn rounded-full px-10 bg-emerald-600 text-white hover:bg-emerald-400 py-2'>Login</Link>
        </div>
    </div>
  )
}

export default Navbar