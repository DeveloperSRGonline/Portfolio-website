import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'
import React from 'react'

const Txt = () => {
    const { windows } = useWindowStore()
    const data = windows.txtfile.data

    if (!data) return null

    const { name, image, subtitle, description } = data

    return (
        <div className="flex flex-col h-full bg-white">
            <div id="window-header" className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-[#fbfbfb]">
                <WindowControls target="txtfile" />
                <h2 className="text-sm font-medium text-gray-500">{name}</h2>
                <div className="w-14"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 font-serif bg-white">
                <div className="max-w-2xl mx-auto">
                    {image && (
                        <div className="flex justify-center mb-8">
                            <img
                                src={image}
                                alt={name}
                                className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"
                            />
                        </div>
                    )}

                    {subtitle && (
                        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 font-sans">
                            {subtitle}
                        </h1>
                    )}

                    <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                        {description && description.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const TxtWindow = WindowWrapper(Txt, 'txtfile')

export default TxtWindow
