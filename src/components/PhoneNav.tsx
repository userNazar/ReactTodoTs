import { useState } from 'react';
import { FcHome, FcSettings, FcTodoList } from 'react-icons/fc';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '../store/hooks';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const { dark, text } = useAppSelector(state => state.theme)


    const toggleList = () => {
        setIsOpen(!isOpen);
    };

    const listVariants = {
        hidden: { opacity: 0, x: '-100%' },
        visible: { opacity: 1, x: '0%' },
    };

    return (
        <div className={`sidebar flex flex-col h-[50px] z-[100] w-60 sm:w-72 ml-2`}>
            <div>
                <div className={`space-y-3 ${text} ${dark ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="font-medium">
                        <div>
                            <button
                                className="flex items-center p-2 space-x-3 rounded-md hover:pl-1 transition-p easy-in-out duration-700"
                                onClick={toggleList}
                            >
                                <AiOutlineUnorderedList />
                                <p className='mt-[-2px] text-2xl font-semibold'>NavList</p>
                            </button>
                        </div>

                        {isOpen && (
                            <motion.ul
                                className={`space-y-1 text-sm ${text} ${dark ? 'bg-gray-800' : 'bg-white'}`}
                                variants={listVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3 }}
                            >
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
                            </motion.ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
