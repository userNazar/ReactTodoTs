import { Route, Routes } from 'react-router-dom'
import TodoCreater from '../components/todoComponents/TodoCreater'
import TodoCompleted from '../components/todoComponents/TodoCompleted'
import TodoAll from '../components/todoComponents/TodoAll'
import TodoNotCompleted from '../components/todoComponents/TodoNotCompleted'
import TodoElementPage from '../components/TodoElementPage'
import { useAppSelector } from '../store/hooks'


export default function Todo() {

  const { list } = useAppSelector(state => state.todosAll)

  return (
    <div>
      <Routes>
        <Route path='/' element={<TodoCreater />} />
        <Route path='ready' element={<TodoCompleted />} />
        <Route path='notready' element={<TodoNotCompleted />} />
        <Route path='all' element={<TodoAll />} />
        <Route path='/:id' element={<TodoElementPage list={list} />} />
      </Routes>
    </div>
  )
}
