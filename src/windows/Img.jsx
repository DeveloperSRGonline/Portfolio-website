import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'
import React from 'react'

const Img = () => {
    const { windows } = useWindowStore()
    const data = windows.imgfile.data

    if (!data) return null

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <div id="window-header" className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-[#fbfbfb]">
                <WindowControls target="imgfile" />
                <h2 className="text-sm font-medium text-gray-500">{data.name}</h2>
                <div className="w-14"></div>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-hidden p-4">
                <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="max-w-full max-h-full object-contain shadow-lg rounded-md"
                />
            </div>
        </div>
    )
}

const ImgWindow = WindowWrapper(Img, 'imgfile')

export default ImgWindow
