import TodoElement from './TodoElement'
import { BsArrow90DegLeft } from "react-icons/bs";
import { useAppSelector } from '../../store/hooks';
import { handleGoBack } from '../../commonFunctions/func';

export default function TodoCompleted() {

    const { list, loading } = useAppSelector(state => state.todosAll)
    const { text, dark } = useAppSelector(state => state.theme)

    const listNotReady = list.filter(el => !el.ready)

    return (
        <div className={`rounded-r-[38px] rounded-l-[38px] min-h-[500px] ${text}`}>
            <div className='m-3'>
                <BsArrow90DegLeft className='cursor-pointer' size={20} onClick={() => handleGoBack()} />
            </div>
            <h2 className='text-2xl font-semibold pl-10'>Your not completed projects:</h2>
            <div>
                {
                    loading ?
                        (
                            <div className="flex justify-center items-center mt-40 h-100 w-100 font-bold">
                                <div className={`animate-spin rounded-full h-40 w-40 border-t-2 ${dark ? 'border-gray-100' : 'border-gray-900'}`}></div>
                            </div>
                        )
                        :
                        (
                            listNotReady.length ?
                                listNotReady.map(el =>
                                    <TodoElement key={el.id} el={el} ready={el.ready} title={el.title} text={el.text} />
                                )
                                :
                                <h2 className="text-xl text-gray-500 flex justify-center items-center">Todo Not Available</h2>
                        )
                }
            </div>
        </div>
    )
}
