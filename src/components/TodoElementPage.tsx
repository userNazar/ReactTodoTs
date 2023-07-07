import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { ITodoType } from '../types/types'
import { BsArrow90DegLeft } from "react-icons/bs";
import { handleGoBack } from '../commonFunctions/func';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeTime, completeTodo, fetchTodosAll } from '../store/slicers/todoAsyncSlicer';
import { ToastContainer, toast } from 'react-toastify';

interface TodoElementPageProps {
  list: ITodoType[]
}

export default function TodoElementPage({ list }: TodoElementPageProps) {

  const { id } = useParams<{ id: string }>();
  const object = list.find(item => item.id === id)


  const [timerRun, setTimerRun] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(object ? object.time : 0);


  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;


  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timerRun) {
      timer = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    };

    return () => {
      clearInterval(timer);
    };
  }, [timerRun])


  const { dark, text } = useAppSelector(state => state.theme)
  const { loading } = useAppSelector(state => state.todosAll)
  const dispatch = useAppDispatch()



  async function changeHandler(obj: { name: string | undefined, val: boolean }) {
    await dispatch(completeTodo(obj))
    await dispatch(fetchTodosAll())
    if (!object?.ready) {
      toast.success('Todo has been completed!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${dark ? 'dark' : 'light'}`,
      })
    } else {
      toast.error('You have not completed todo!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${dark ? 'dark' : 'light'}`,
      });
    }
  }

  async function changeAsync() {
    await dispatch(changeTime({ name: object?.name, time: timer }))
    await dispatch(fetchTodosAll())
  }

  function changeTimeBtn(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLElement

    if (timerRun && target.classList.contains('btn-stop')) {
      changeAsync()
      setTimerRun(false);

      toast.error('Timer stop', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${dark ? 'dark' : 'light'}`,
      });
    } else if (!timerRun && target.classList.contains('btn-start')) {
      setTimerRun(true)
      toast.success('Timer start', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${dark ? 'dark' : 'light'}`,
      });
    }


  }





  return (
    <>
      <div className={`${text} m-3`}>
        <BsArrow90DegLeft className='cursor-pointer' size={20} onClick={() => {
          handleGoBack()
          changeAsync()
        }} />
      </div>
      {
        !object ?
          <h1 className={`${text}`}>Element not exists</h1>
          :
          <div className={`sm:ml-10 sm:mr-10 mt-5 border-radius-20  rounded-r-[38px] rounded-l-[38px] ${text} ${dark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h1 className='text-4xl text-center pt-2'>{object.title}</h1>

            <div className={`flex flex-wrap justify-center 2xl:justify-start m-auto pt-10 pl-10 pr-10`}>
              <div className={`m-1 p-2 border justify-center border-gray-400 ${dark ? 'bg-gray-700' : ' bg-white'}`}>
                <img className='w-60 h-80' src={object.img ? object.img : 'https://images.unsplash.com/photo-1506784781895-38847b5e50e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'} alt="" />
              </div>
              <div className={`${dark ? 'bg-gray-500' : ' bg-white'} ${text} text-gray-700 m-1 text-xl w-[820px] 2xl:ms-20 rounded-r-[38px] rounded-l-[38px] p-10`}>
                <h2 className='text-2xl mb-3'>Task: </h2>
                <p className="border border-gray-200 border-t-2 border-b-2 pl-2 sm:p-10 pt-5 h-40 overflow-y-auto">
                  {object.text}
                </p>


              </div>
            </div>
            <hr className='mt-5' />

            <div className='flex flex-wrap justify-center sm:justify-between'>

              <div className='ml-10 mr-10 mt-5 pb-10 max-h-[120px] flex flex-col justify-center'>
                <p className='text-xl'>Completed:  <span className={`${object.ready ? 'text-green-600' : 'text-red-600'}`}>{loading ? <span className="inline-block loader border border-solid border-gray-200 border-t-[4px] border-blue-500 rounded-full w-5 h-5 animate-spin"></span> : object.ready.toString()}</span></p>


                <button
                  className={!object.ready ? `mt-5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded` : `mt-5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded`}
                  onClick={() => changeHandler({ name: object.name, val: !object.ready })}
                >
                  {
                    loading ?
                      <span className="inline-block loader border border-solid border-gray-200 border-t-[4px] border-blue-500 rounded-full w-5 h-5 animate-spin"></span>
                      :
                      !object.ready ? "Finish" : 'UNFinish'
                  }
                </button>
              </div>


              <div className='m-5 sm:mr-10 flex flex-col items-center'>
                <div className="flex items-center justify-center w-[95px] h-[41px] bg-yellow-50 rounded-lg border border border border">
                  <span className="text-[14px] font-semibold text-black">{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <button
                    className="m-1 w-20 h-10 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors duration-300 btn-start"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => changeTimeBtn(e)}
                  >
                    Start
                  </button>

                  <button
                    className="m-1 w-20 h-10 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors duration-300 btn-stop"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => changeTimeBtn(e)}
                  >
                    Stop
                  </button>
                </div>
              </div>

            </div>
          </div>
      }
      <ToastContainer />
    </>
  )
}

