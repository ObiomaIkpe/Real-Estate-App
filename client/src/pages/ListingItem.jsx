import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'

const ListingItem = ({listing}) => {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[250px]'>
      <Link to={`/listing/${listing._id}`}>
          <img src={listing.imageURLs[0] || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bankrate.com%2Freal-estate%2Fhow-to-find-real-estate-comps%2F&psig=AOvVaw3JqYw9LtAJsmD_ydI_tNeD&ust=1704583096824000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMjI7Iqxx4MDFQAAAAAdAAAAABAI" } alt='listing cover' 
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
          <div className='p-3 flex-col gap-2 w-full '>
              <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
              <div className='flex items-center gap-1'>
                <MdLocationOn className='h-4 w-4 text-green-700'/> <p className='text-sm text-gray-600 w-full'>{listing.address}</p>
              </div>

              <div className='flex items-center gap-1'>
            <p className='text-sm text-grap-600 line-clamp-2'>{listing.description}</p>
              </div>
              <p className='text-slate-500 mt-2 font-semibold flex items-center'>
                $  
              {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && '/ month'}  
            </p>

            <div className='text-slate-700 flex gap-4'>
              <div className='font-bold text-xs '>
                {listing.bedrooms > 1 ? `${listing.bedrooms}
                beds` : `${listing.bedrooms} bed `}
              </div>

              <div className='font-bold text-xs'>
                {listing.bathrooms > 1 ? `${listing.bathrooms}
                baths` : `${listing.bathrooms} bath `}
              </div>
            </div>
          </div>
      </Link>  
    </div>
  )
}

export default ListingItem