import { Route, Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Todo from './pages/Todo';
import Settings from './pages/Settings';
import SideBar from './components/SideBar';
import Header from './components/Header';
import PhoneNav from './components/PhoneNav';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchTodosAll } from './store/slicers/todoAsyncSlicer';
import { addSecond } from './store/slicers/timeSession';


function App() {

  const dispatch = useAppDispatch()
  const { dark } = useAppSelector(state => state.theme)

  useEffect(() => {
    let timer: NodeJS.Timeout;


    timer = setInterval(() => {
      dispatch(addSecond())
    }, 1000)


    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    dispatch(fetchTodosAll());
    // eslint-disable-next-line
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <div className={`flex ${dark ? 'bg-gray-800' : 'bg-white'} transition duration-1000`}>
        {windowWidth >= 1112 && <SideBar />}
        <div className="flex flex-col w-full">
          <Header />
          {windowWidth <= 1112 && <PhoneNav />}
          <div className="w-full">
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/todos/*" element={<Todo />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>

        </div>
      </div>
      <Footer />

    </>


  );
}

export default App;
