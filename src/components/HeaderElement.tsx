import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ITodoType } from '../types/types'
import { FcApproval, FcExpired } from "react-icons/fc";
import { useAppSelector } from '../store/hooks';

interface HeaderElementProps {
  el: ITodoType;
}

export default function HeaderElement({ el }: HeaderElementProps) {

  const { dark } = useAppSelector(state => state.theme)

  const navigate = useNavigate()

  function openPage() {
    navigate(`/todos/${el.id}`)
  }

  return (
    <div
      className={`flex justify-between items-center ${dark ? 'bg-gray-400' :'bg-white '} m-1 ml-5 mr-5 p-2 rounded-lg border border-gray-200 w-[300px] cursor-pointer ${dark ? 'hover:bg-gray-500': 'hover:bg-gray-100'}`}
      onClick={openPage}
    >
      <div>
        {el.title}
      </div>
      <div>
        {
          el.ready ?
            <FcApproval size={20} />
            :
            <FcExpired size={20} />
        }
      </div>
    </div>
  )
}
