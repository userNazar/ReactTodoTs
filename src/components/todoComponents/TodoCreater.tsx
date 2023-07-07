import { useState } from 'react'
import { TfiWrite } from 'react-icons/tfi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import { BsCalendarCheck, BsSave2Fill, BsExclamationSquare, BsArrowRightShort } from 'react-icons/bs';
import { CgMoreVerticalO, CgMoreO } from 'react-icons/cg';
import ProjectElement from '../dashBoardComponents/ProjectElement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createTodo, fetchTodosAll } from '../../store/slicers/todoAsyncSlicer';
import { ITodoType } from '../../types/types';


interface TodoCreaterInputs {
    title: string;
    text: string;
    img: string;
}

export default function TodoCreater() {


    const dispatch = useAppDispatch()
    const { bgScreen, text, dark } = useAppSelector(state => state.theme)

    const { list, loading } = useAppSelector(state => state.todosAll)
    const [optional, setOptional] = useState<boolean>(false)
    const [input, setInput] = useState<TodoCreaterInputs>({
        title: '',
        text: '',
        img: '',
    })


    async function addInput(todo: ITodoType) {
        await dispatch(createTodo(todo))
        await dispatch(fetchTodosAll())
    }


    function addBtnHandler() {
        if (!optional) {
            setInput(prev => ({ ...prev, title: '', img: '' }))
        }

        if (input.text.trim()) {
            toast.success('Todo has been added!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: `${dark ? 'dark' : 'light'}`,
            });
            addInput({
                id: Date.now().toString(),
                ...input,
                title: input.title ? input.title : 'TODO',
                ready: false,
                time: 0
            })
        } else {
            toast.error('You have not added todo!', {
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


        setInput(prev => {
            return {
                ...prev,
                title: '',
                text: '',
                img: '',
            }
        })


    }

    const slicedListProjects = list.slice(-4)
    const getTitle = (el: ITodoType) => {
        if (el.title) {
            return el.title;
        }

        if (el.text.length > 6) {
            return el.text.slice(0, 6) + '...';
        }

        return el.text;
    };

    return (
        <>
            <div className='h-[240px]'>
                <div className={`m-10 sm:m-20 shadow-lg ${bgScreen} ${text}`}>
                    <div className='m-4 flex items-center'>
                        <TfiWrite className='mr-4 hover:cursor-pointer' />
                        <input
                            className={`w-[100%] focus:outline-none ${bgScreen} ${text}`}
                            placeholder='Write todo...'
                            type="text"
                            value={input.text}
                            onChange={(e) => setInput(prev => ({ ...prev, text: e.target.value }))}
                        />
                    </div>

                    <div className={`p-2 ${dark ? 'bg-gray-900' : 'bg-gray-100'} ${text}`}>
                        <div className={`transition-all duration-1000 ${optional ? 'opacity-100 max-h-[120px] py-2' : 'opacity-0 max-h-[0px] py-0 overflow-hidden'} flex flex-wrap items-center`}>
                            <input
                                className={`mr-4 p-1 pl-3 focus:outline-none m-1 text-base sm:text-sm md:text-base lg:text-lg ${bgScreen} ${text}`}
                                type="text"
                                placeholder='Title...'
                                value={input.title}
                                onChange={(e) => setInput(prev => ({ ...prev, title: e.target.value }))}
                            />
                            <input
                                className={`p-1 pl-3 focus:outline-none mr-4 m-1 text-base sm:text-sm md:text-base lg:text-lg ${bgScreen} ${text}`}
                                type="text"
                                placeholder='Img source...'
                                value={input.img}
                                onChange={(e) => setInput(prev => ({ ...prev, img: e.target.value }))}
                            />
                            <span className={` text-base sm:text-sm m-1 ml-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}> (Optionally) </span>
                        </div>

                        <div className='flex justify-between mt-2 m-1'>
                            <button className={`ml-4}`}
                                onClick={() => setOptional(prev => !prev)}
                            >
                                {optional ? <CgMoreVerticalO size={30} /> : <CgMoreO size={30} />}
                            </button>
                            <button
                                className={`mr-4 border font-semibold border-gray-500 p-1 w-[50px] ${dark ? 'bg-white' : ''} ${input.text ? " text-blue-600" : "text-gray-600"} transition-colors duration-300`}
                                onClick={addBtnHandler}
                            >
                                Add
                            </button>
                        </div>
                    </div >
                    <div>
                    </div>
                    <ToastContainer />
                </div >
            </div>


            <div className='flex flex-wrap ml-10 mr-10 justify-center'>

                <div className={` ${text} ${dark ? 'bg-gray-900' : 'bg-gray-100'} w-60 rounded-[34px] ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} m-5 transtition duration-200`}>
                    <NavLink className='h-[100%] p-4 w-[100%] flex justify-between items-center pr-5 pl-5' to={'/todos/ready'}>
                        Ready
                        <BsCalendarCheck size={20} />
                    </NavLink>
                </div>

                <div className={` ${text} ${dark ? 'bg-gray-900' : 'bg-gray-100'} w-60 rounded-[34px] ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} m-5 transtition duration-200`}>
                    <NavLink className='h-[100%] p-4 w-[100%] flex justify-between items-center pr-5 pl-5' to={'/todos/all'}>
                        All
                        <BsSave2Fill size={20} />
                    </NavLink>
                </div>

                <div className={` ${text} ${dark ? 'bg-gray-900' : 'bg-gray-100'} w-60 rounded-[34px] ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} m-5 transtition duration-200`}>
                    <NavLink className='h-[100%] p-4 w-[100%] flex justify-between items-center pr-5 pl-5' to={'/todos/notready'}>
                        Not ready
                        <BsExclamationSquare size={20} />
                    </NavLink>
                </div>

            </div>

            <div className='flex flex-wrap justify-center m-5'>
                <div className={`${dark ? 'bg-gray-900' : 'bg-gray-100'} w-[774px] h-[501px] rounded-[34px] flex flex-col mt-20`}>
                    <div className={`${text} flex justify-between`}>
                        <h2 className='text-2xl font-semibold m-[30px]'>Projects</h2>
                        <div className='m-[30px]'><NavLink to={'/todos/all'}><BsArrowRightShort size={40} /></NavLink></div>
                    </div>
                    <div className="flex flex-col items-center pl-5 pr-5 flex-grow">
                        {
                            loading ? (
                                <div className="flex justify-center items-center h-42 w-42">
                                    <div className={`animate-spin rounded-full h-40 w-40 border-t-2 ${dark ? 'border-gray-100' : 'border-gray-900'}`}></div>
                                </div>
                            ) : (
                                slicedListProjects.length ? (
                                    slicedListProjects.map(el => (
                                        <ProjectElement key={el.id} el={el} title={getTitle(el)} time={el.time} color='bg-gray-100' />
                                    ))
                                ) : (
                                    <h2 className="text-xl text-gray-500">Todo Not Available</h2>
                                )
                            )
                        }
                    </div>
                    <div className={`mt-auto self-end m-10 ${text}`}>
                        <button><NavLink className='font-bold text-4xl' to={'/todos/all'}>...</NavLink></button>
                    </div>
                </div>
            </div>

        </>

    )
}
