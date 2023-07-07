import { FcOpenedFolder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { ITodoType } from "../../types/types";
import { useAppSelector } from "../../store/hooks";

interface ProjectElementProps {
    title: string;
    time: number;
    el: ITodoType,
    color: string;
}

export default function ProjectElement({ title, time, el, color }: ProjectElementProps) {

    const { bgScreen, text, dark } = useAppSelector(state => state.theme)

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const navigate = useNavigate()

    function openTodoElementPageHandeler() {
        navigate(`/todos/${el.id}`)
    }

    return (
        <div
            className={`flex items-center justify-between w-full md:w-[701px] h-16 rounded-2xl border border-zinc-150 
                cursor-pointer mb-4
                ${dark ? 'hover:bg-gray-500' : (color.includes('white') ? 'hover:bg-gray-100' : 'hover:bg-white')} 
                ${dark ? bgScreen : color} 
                ${text}
                transition duration-200`}
            onClick={openTodoElementPageHandeler}
        >
            <div className="flex items-center">
                <FcOpenedFolder className="mr-4 ml-4" size={40} />
                <p className="text-[16px] font-semibold">{title}</p>
            </div>
            <div className={`flex items-center justify-center w-[95px] h-[41px]  rounded-lg border border border border mr-2 text-black ${dark ? 'bg-yellow-200' : 'bg-yellow-50'}`}>
                <span className="text-[14px] font-semibold">{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
            </div>
        </div>

    )
}
