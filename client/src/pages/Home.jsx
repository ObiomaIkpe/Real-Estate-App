import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from './ListingItem';


const Home = () => {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log([])
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListing();
      } catch (error) {
          console.log(error)
      }

    }
    const fetchRentListing = async () => {

    }
    fetchOfferListings()
  }, [])
  return (
    <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
    {/*top */}
      <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your <span className='text-slate-500 '>Perfect</span> <br/> place with ease</h1>

      <div className='text-gray-400 text-xs sm:text-sm'>
      Sahand Estate is the best place to find your next perfect place to live.

      <br />
      we have a wide range of properties for you to choose from.
      </div>

      <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
        Let's get started.
      </Link>

    {/* swiper */}
      <Swiper navigation>
          {
            offerListings && offerListings.length > 0 && offerListings.map((listing) => (
              <SwiperSlide>
                <div key={listing._id}
                  style={{background: `url(${listing.u=imageURLs[0]}) center no-repeat`, backgroundSize: "cover" }} className='h-[500px]'   >
                </div>
              </SwiperSlide>
            ))
          }


      </Swiper>


    {/* listing results for offer, sale, and rent.*/}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>
                  Recent Offers
                </h2>
                <Link to={'/search?offer=true'}  className='text-sm text-blue-800 hover:underline'>
                  Show more offers
                </Link>
                </div>

                <div className='flex flex-wrap gap-4'> 
                {
                  offerListings.map((listing) => {
                    <ListingItem listing={listing} key={listing._id} />
                  })
                }
                </div>
            </div>
          )
        }



{
          rentListings && rentListings > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>
                  Recent places for rent
                </h2>
                <Link to={'/search?type=sale'}  className='text-sm text-blue-800 hover:underline'>
                  Show more places for rent.
                </Link>
                </div>

                <div className='flex flex-wrap gap-4'> 
                {
                  rentListings.map((listing) => {
                    <ListingItem listing={listing} key={listing._id} />
                  })
                }
                </div>
            </div>
          )
        }




{
          saleListings && saleListings > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>
                  Recent places for sale
                </h2>
                <Link to={'/search?offer=true'}  className='text-sm text-blue-800 hover:underline'>
                  Show more places for sale.
                </Link>
                </div>

                <div className='flex flex-wrap gap-4'> 
                {
                  saleListings.map((listing) => {
                    <ListingItem listing={listing} key={listing._id} />
                  })
                }
                </div>
            </div>
          )
        }


      </div>
    </div>

  )
}

export default Home 