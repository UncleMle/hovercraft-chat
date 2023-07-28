export type SendData = {
    message: any,
    applyData: string,
    token: string,
    roomId: string
}

export type messageSave = {
    message: any,
    username: string,
    accountId: number,
    timeSent: number
}

export type JoinRoom = {
    roomId: string,
    token: string
}

export type SessionUser = {
    socketId: string,
    token: string
}

export type RoomData = {
    roomId: string,
    token: string,
    state: boolean
}