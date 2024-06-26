import React, { useEffect, useState, useRef } from 'react'
import { RoomContext } from './RoomContext'

function RoomContextProvider({ children }) {

    const [editorData, setEditorData] = useState({
        _id: "",
        html: "",
        css: "",
        js: ""
    })
    const boardData = useRef({
        _id: "",
        content: []
    })
    const [chatsData, setChatsData] = useState([])
    const [roomData, setRoomData] = useState(null)
    const [mode, setMode] = useState("editor")
    const [socketio, setSocketio] = useState(null)
    const [permission, setPermission] = useState(null)
    const [clients, setClients] = useState([])

    function clearRoomStuff() {
        setRoomData(null)
        setChatsData([])
        setEditorData({
            _id: "",
            html: "",
            css: "",
            js: ""
        })
        boardData.current = {
            _id: "",
            content: ""
        }
        setMode("editor")
        setClients([])
    }

    return (
        <RoomContext.Provider value={{ editorData, boardData, chatsData, setEditorData, setChatsData, roomData, setRoomData, mode, setMode, clearRoomStuff, socketio, setSocketio, setPermission, permission, clients, setClients }}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomContextProvider