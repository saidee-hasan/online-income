
import { Link } from "react-router"
import './banner.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"
import banner from '../../assets/banner.png'

const Banner = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
      <section 
  className="lg:h-[calc(100vh-74px)] overflow-x-hidden bg-cover bg-center bg-no-repeat sm:flex items-center banner"
>
  <div className="w-full max-w-[90%] xl:max-w-[1200px] mx-auto px-4">
    <div className="flex flex-col sm:flex-row items-center justify-between text-white pt-4 lg:pt-0 text-center sm:text-left">
      
      {/* Text Content */}
      <div data-aos="fade-right" data-aos-duration="2000" className="sm:w-full lg:w-[45%]">
        <h1 className="text-4xl sm:text-5xl font-bold mb-5">
          <span className="font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">Online income - </span>
          <span className="font-bold"> Learn, Excel, and Build Your Dream Career!</span>
          <span className="animate-pulse">🚀</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          8 May 2024 Pro Academy started. From the beginning, our goal was to develop the educated unemployed of the country completely free of cost. And provide guaranteed jobs. Now we are moving forward with this goal. Initially, we started with about 150 students, but some students were serious and in the end, Pro Academy was able to arrange their jobs and internships. Thank you all for being with us.
        </p>
    <div className="flex flex-wrap gap-4 mt-5">
  <Link to='/courses'>
    <button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 transition-all duration-300 font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-blue-400/50">
      Login 
    </button>
  </Link>

  <Link to='/courses'>
    <button className="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-600 transition-all duration-300 font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-green-400/50">
Sub Admin
    </button>
  </Link>

  <Link to='/courses'>
    <button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 transition-all duration-300 font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-pink-400/50">
      View All
    </button>
  </Link>
</div>

      </div>

      {/* Image */}
      <div className="sm:w-full lg:w-[50%] lg:h-[500px] mt-8 sm:mt-0" data-aos="fade-left" data-aos-duration="2000">
        <img className="w-full h-auto max-w-full object-contain" src={banner} alt="Banner" />
      </div>
    </div>
  </div>
</section>

    )
}

export default Banner
