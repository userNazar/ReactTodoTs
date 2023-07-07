import { FcHome, FcSettings, FcTodoList } from 'react-icons/fc';
import { NavLink } from "react-router-dom";
import { useAppSelector } from '../store/hooks';

export default function Sidebar() {

    const { dark } = useAppSelector(state => state.theme)

    return (
        <div className={`sidebar flex flex-col h-screen w-60 ${dark ? 'text-white' : 'text-dark'}  ${dark ? 'bg-gray-800' : 'bg-white'} transition-bg duration-1000 `}>
            <div className="p-3">
                <div className="space-y-3 fixed">
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold">Navigation</h2>
                    </div>
                    <div className="font-medium">
                        <ul className="pt-2 pb-4 space-y-1 text-sm ml-4">
                            <li className="rounded-sm flex items-center">
                                <FcHome size={20} />
                                <NavLink
                                    to="/"
                                    className="flex items-center p-2 space-x-3 rounded-md hover:pl-5 transition-p easy-in-out duration-700"
                                >
                                    <span>Home</span>
                                </NavLink>
                            </li>

                            <li className="rounded-sm flex items-center">
                                <FcTodoList size={20} />
                                <NavLink
                                    to="todos"
                                    className="flex items-center p-2 space-x-3 rounded-md hover:pl-5 transition-p easy-in-out duration-700"
                                >
                                    <span>Todo</span>
                                </NavLink>
                            </li>

                            <li className="rounded-sm flex items-center">
                                <FcSettings size={20} />
                                <NavLink
                                    to="settings"
                                    className="flex items-center p-2 space-x-3 rounded-md hover:pl-5 transition-p easy-in-out duration-700"
                                >
                                    <span>Settings</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}