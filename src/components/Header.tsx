import React, { useState } from 'react';
import { BiTask, BiTaskX } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { useAppSelector } from '../store/hooks';
import { ITodoType } from '../types/types';
import HeaderElement from './HeaderElement';



export default function Header() {
    const { list } = useAppSelector(state => state.todosAll)
    const { text, dark } = useAppSelector(state => state.theme)

    const [found, setFounded] = useState<ITodoType[]>(list)
    const [search, setSearch] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('');





    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        setInputValue(target.value)
        if (target.value.trim()) {
            setSearch(true)
            setFounded(() => {
                return list.filter((item) =>
                    item.title.toLowerCase().includes(target.value.toLowerCase().trim())
                )
            })
        } else {
            setSearch(false)
        }


    };


    return (
        <header className={`m-5 flex flex-wrap justify-between ${text}`}>
            <h1 className="text-2xl font-bold mt-2">Dashboard</h1>
            <div className="flex items-center">
                <div className="relative mt-2">
                    <input
                        type="text"
                        className={`p-2 w-80 pl-4 bg-opacity-47 rounded-lg ${dark ? 'bg-gray-600' : 'bg-gray-200'} transitiom duration-1000`}
                        placeholder="Enter todo..."
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    {!search && (
                        <CiSearch className="absolute left-[270px] top-1/2 transform -translate-y-1/2" size={23} />
                    )}

                    {
                        search
                            ?
                            <div className={`absolute flex flex-col pb-2 pt-2 justify-center items-center  w-80 min-h-[40px] z-[101] mt-1 rounded-lg border 
                            
                            ${dark ? 'border-gray-600' : "border-gray-200"}
                            ${dark ? 'bg-gray-600' : 'bg-white'}`}>
                                {
                                    found.length
                                        ?
                                        found.map(el => <HeaderElement key={el.id} el={el} />)
                                        :
                                        <h2 className="text-gray-500 flex justify-center items-center">Todo Not Available</h2>
                                }
                            </div>
                            :
                            null
                    }


                </div>
            </div>

            <div className='mt-2'>
                <button>
                    {true ? <BiTask size={30} /> : <BiTaskX size={30} />}
                </button>
            </div>
        </header>
    );
}
