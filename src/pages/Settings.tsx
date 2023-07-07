
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { blackTheme, whiteTheme } from '../store/slicers/themeSlicer';

export default function Settings() {
  const dispatch = useAppDispatch();
  const { dark, text } = useAppSelector(state => state.theme);




  const btnHandler = () => {
    dark ? dispatch(whiteTheme()) : dispatch(blackTheme())
  }






  return (
    <div className={`p-5 h-20 transition duration-200 ${dark ? 'bg-gray-600' : 'bg-gray-100'} rounded-r-[38px] rounded-l-[38px] h-full`}>
      <h1 className={`pt-5 ${text} text-xl`}>Change theme</h1>
      <div
        className={` mt-5 flex items-center justify-between w-16 h-8 ${dark ? 'bg-gray-300' : 'bg-gray-800'} rounded-full p-1 cursor-pointer transition-colors duration-500
          }`}
        onClick={btnHandler}
      >
        <div
          className={`${dark ? 'bg-white' : 'bg-gray-500'} w-6 h-6 rounded-full transform ${dark ? 'translate-x-8' : 'translate-x-1'
            } transition-transform duration-500`}
        ></div>
      </div>

      <div className={`${dark ?'bg-gray-900' : 'bg-white'} py-12 px-8 sm:px-16 m-5 rounded-r-[38px] rounded-l-[38px] transition duration-1000`}>
        <h2 className={`text-4xl ${text} font-bold mb-6`}>Report a Bug</h2>
        <form className="max-w-md mx-auto" onClick={e => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="name" className={`${text} mb-2 block`}>Your Name</label>
            <input
              type="text"
              id="name"
              className={`w-full px-4 py-2 rounded-lg ${dark ? 'bg-gray-800' : 'bg-gray-200'} ${text} focus:outline-none  transition duration-1000`}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className={`${text} mb-2 block`}>Your Email</label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 rounded-lg ${dark ? 'bg-gray-800' : 'bg-gray-200'} ${text} focus:outline-none  transition duration-1000`}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bugDescription" className={`${text} mb-2 block`}>Bug Description</label>
            <textarea
              id="bugDescription"
              className={`w-full px-4 py-2 rounded-lg ${dark ? 'bg-gray-800' : 'bg-gray-200'} ${text} focus:outline-none  transition duration-1000`}
              placeholder="Describe the bug..."
              
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
