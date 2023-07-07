import { FcPlus, FcClock, FcCancel } from "react-icons/fc";
import { BsArrowRightShort } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { useAppSelector } from "../../store/hooks";

export default function DashBoardStats() {

    const { list, loading } = useAppSelector(state => state.todosAll);
    const { timeSeconds } = useAppSelector(state => state.session)
    const { bgScreen, text } = useAppSelector(state => state.theme);

    // const hours = Math.floor(timeSeconds / 3600);
    const minutes = Math.floor((timeSeconds % 3600) / 60);
    const seconds = timeSeconds % 60;

    return (
        <div className={`flex flex-wrap justify-around ${text}`}>
            <div className={`dashboard__card-stats flex flex-col text-2xl m-5 font-semibold h-[301px] w-[470px] rounded-[34px] ${bgScreen}`}>
                <div className='m-10 flex justify-between'>
                    <p>Ready</p>
                    <div><NavLink to={'/todos/ready'}><BsArrowRightShort size={40} /></NavLink></div>
                </div>
                <div className='flex flex-wrap justify-between mr-10 ml-10 mt-auto mb-[40px]'>
                    <p className='text-5xl font-bold'>
                        {
                            loading
                                ?
                                <span className="inline-block loader border border-solid border-gray-200 border-t-[4px] border-blue-500 rounded-full w-5 h-5 animate-spin"></span>
                                :
                                ((list.filter(el => el.ready).length / list.length) * 100).toString().slice(0, 4)
                        }
                        %
                    </p>
                    <div className='mt-[-12px]'>
                        <FcPlus size={80} />
                    </div>
                </div>
            </div>

            <div className={`dashboard__card-stats flex flex-col text-2xl m-5 font-semibold h-[301px] w-[470px] rounded-[34px] ${bgScreen}`}>
                <p className='m-10 flex justify-between'>Active session</p>
                <div className='flex flex-wrap justify-between mr-10 ml-10 mt-auto mb-[40px]'>
                    <p className='text-5xl font-bold'>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
                    <div className='mt-[-12px]'>
                        <FcClock size={80} className="text-black"/>
                    </div>
                </div>
            </div>

            <div className={`dashboard__card-stats flex flex-col text-2xl m-5 font-semibold h-[301px] w-[470px] rounded-[34px] ${bgScreen}`}>
                <div className='m-10 flex justify-between'>
                    <p>Not ready</p>
                    <div><NavLink to={'/todos/notready'}><BsArrowRightShort size={40} /></NavLink></div>
                </div>
                <div className='flex flex-wrap justify-between mr-10 ml-10 mt-auto mb-[40px]'>
                    <p className='text-5xl font-bold'>
                        {
                            loading
                                ?
                                <span className="inline-block loader border border-solid border-gray-200 border-t-[4px] border-blue-500 rounded-full w-5 h-5 animate-spin"></span>
                                :
                                list.filter(el => !el.ready).length
                        }
                    </p>
                    <div className='mt-[-12px]'>
                        <FcCancel size={80} />
                    </div>
                </div>
            </div>
        </div >
    )
}
