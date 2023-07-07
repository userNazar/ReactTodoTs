import { FcApproval, FcExpired } from "react-icons/fc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ITodoType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteTodo, fetchTodosAll } from "../../store/slicers/todoAsyncSlicer";

interface TodoElementProps {
    el: ITodoType;
    ready: boolean;
    title: string;
    text: string;
}

export default function TodoElement({ ready, title, text, el }: TodoElementProps) {

    const navigate = useNavigate()


    const dispatch = useAppDispatch()
    const { bgCard, dark } = useAppSelector(state => state.theme)


    async function openTodoElementPageHandeler(e: React.MouseEvent<HTMLElement>) {
        const target = e.target as HTMLElement;



        if (target.classList.contains("deleteBtn")) {
            e.stopPropagation();
            await dispatch(deleteTodo(el.name));
            await dispatch(fetchTodosAll());
        } else {
            navigate(`/todos/${el.id}`);
        }

    }





    return (
        <div
            className={`flex flex-wrap justify-between items-center m-10  border  rounded-lg 
            p-4 ${bgCard} 
            ${dark ? 'hover:bg-gray-400' : 'hover:bg-white '}
            ${dark ? 'border-gray-900' : 'border-gray-300 '}
           
            transition duration-1000 cursor-pointer`}
            onClick={(e: React.MouseEvent<HTMLElement>) => openTodoElementPageHandeler(e)}
        >
            <div className='ml-3'>
                {
                    ready ?
                        <FcApproval size={30} />
                        :
                        <FcExpired size={30} />
                }

            </div>
            <div className='font-semibold'>{title}</div>
            <div className='text-blue-300 hidden md:block'>
                {
                    text.length > 12
                        ?
                        text.slice(0, 12) + '...'
                        :
                        text
                }
            </div>
            <div className='mr-3 pl-2 deleteblock h-full'>
                <button className="deleteBtn p-2 hover:bg-red-500 transition duration-500 rounded-lg"><RiDeleteBin6Line size={30} className="deleteBtn" /></button>
            </div>
        </div>
    )
}
