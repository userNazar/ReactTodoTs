import { BsArrowRightShort } from "react-icons/bs";
import { NavLink, useNavigate } from 'react-router-dom';
import ProjectElement from './ProjectElement';
import { useAppSelector } from '../../store/hooks';
import { ITodoType } from "../../types/types";

export default function DashBoardProjects() {

    const { list, loading } = useAppSelector(state => state.todosAll)
    const { bgScreen, text, dark } = useAppSelector(state => state.theme)

    const slicedListProjects = list.slice(-4)
    const slicedListPhotos = list.slice(-5)


    const navigate = useNavigate()

    function openTodoElementPageHandeler(el: ITodoType) {
        navigate(`/todos/${el.id}`)
    }

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
        <div className={`flex flex-wrap justify-center m-5 ${text}`}>

            <div className={`m-5 w-[774px] min-h-[501px] rounded-[34px] ${bgScreen}`}>
                <div className="flex justify-between">
                    <h2 className='text-2xl font-semibold m-[30px]'>Recent Project</h2>
                    <div className='m-[30px]'><NavLink to={'/todos/notready'}><BsArrowRightShort size={40} /></NavLink></div>
                </div>

                <div className='m-5 flex flex-wrap justify-center'>
                    {
                        loading ? (
                            <div className="flex justify-center items-center h-42 w-42">
                                <div className={`'animate-spin rounded-full h-40 w-40 border-t-2 ${dark ? 'border-gray-100' : 'border-gray-900'}`}></div>
                            </div>
                        ) : (
                            slicedListPhotos.length ? (
                                slicedListPhotos.map(el => (
                                    <div className='ml-5 mr-5 mt-2 cursor-pointer' key={el.id} onClick={() => openTodoElementPageHandeler(el)}>
                                        <img
                                            className="w-[201px] h-[131px] rounded-2xl"
                                            src={el.img ? el.img : 'https://images.unsplash.com/photo-1506784781895-38847b5e50e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'}
                                            alt="photoTodo"
                                        />
                                    </div>
                                ))
                            ) : (
                                <h2 className="text-xl text-gray-500">Todo Not Available</h2>
                            )
                        )
                    }

                </div>
            </div>

            <div className={`m-5  w-[774px] h-[501px] rounded-[34px] flex flex-col ${bgScreen}`}>
                <div className={"flex justify-between"}>
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
                                    <ProjectElement key={el.id} el={el} title={getTitle(el)} time={el.time} color="bg-white" />
                                ))
                            ) : (
                                <h2 className="text-xl text-gray-500">Todo Not Available</h2>
                            )
                        )
                    }

                </div>
                <div className='mt-auto self-end m-7 mr-10'>
                    <NavLink to="/todos/all" className="inline-block">
                        <button className={`w-[116px] h-[46px] bg-black rounded-lg hover:text-white hover:bg-gray-500 transition-colors duration-300 mt-auto
                            ${dark ? 'bg-white' : 'bg-black'}
                            ${dark ? 'text-black' : 'text-white'} `
                        }>
                            View all
                        </button>
                    </NavLink>

                </div>
            </div>

        </div>
    )
}
