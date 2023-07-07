import React from 'react'
import { useAppSelector } from '../store/hooks'

export default function Footer() {

    const { dark } = useAppSelector(state => state.theme)

    return (
        <footer className={`${dark ? 'text-white' : 'text-dark'}  ${dark ? 'bg-gray-900' : 'bg-white'} py-8 px-4 sm:px-6 lg:px-8 pt-20 mt-auto transition-bg duration-1000`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">About Us</h3>
                        <p>This program exists for portfolio but of course you can use it)</p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Services</h3>
                        <ul className="list-none">
                            <li><a href="r" target='_blank' rel="noreferrer">Web Design</a></li>
                            <li><a href="r" target='_blank' rel="noreferrer">Graphic Design</a></li>
                            <li><a href="r" target='_blank' rel="noreferrer">SEO</a></li>
                            <li><a href="r" target='_blank' rel="noreferrer">Social Media Marketing</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact Us</h3>
                        <p>Email: hrozianazar@gmail.com</p>
                        <p>Phone: +1 123 456789</p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Follow Us</h3>
                        <div className="flex flex-col">
                            <a href="https://www.facebook.com/play.book.902" target='_blank' rel="noreferrer"><i className="fab fa-facebook-f">Facebook</i></a>
                            <a href="https://twitter.com/" target='_blank' rel="noreferrer"><i className="fab fa-twitter">Twitter</i></a>
                            <a href="https://www.instagram.com/hrozianazar/" target='_blank' rel="noreferrer"><i className="fab fa-instagram">Instagram</i></a>
                            <a href="https://www.linkedin.com/in/%D0%BD%D0%B0%D0%B7%D0%B0%D1%80-%D0%B3%D1%80%D0%BE%D0%B7%D1%8F-a46185245/" target='_blank' rel="noreferrer"><i className="fab fa-linkedin-in">Linkedin-in</i></a>
                        </div>
                    </div>
                </div>
                <hr className="my-8 border-gray-300" />
                <p className="text-center text-gray-500 text-sm">&copy; 2023 userNazar. All rights reserved.</p>
            </div>
        </footer>

    )
}
