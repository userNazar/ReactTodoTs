import React from 'react'
import DashBoardHeader from '../components/dashBoardComponents/DashBoardHeader'
import DashBoardStats from '../components/dashBoardComponents/DashBoardStats'
import DashBoardProjects from '../components/dashBoardComponents/DashBoardProjects'
import { useAppSelector } from '../store/hooks'

export default function DashBoard() {

  const { bgCard } = useAppSelector(state => state.theme)

  return (
    <div className={`${bgCard} rounded-r-[38px] rounded-l-[38px] min-h-[500px]`}>
      <DashBoardHeader />
      <DashBoardStats />
      <DashBoardProjects />
    </div>
  )
}
