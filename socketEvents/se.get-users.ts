import { JoinRoom } from "@types";
import { AppDataSource } from "../db/data-source";
import { openSockets } from "../db/entities/hover.openSockets";
import { Socket } from "socket.io";
import { io } from "../hover.core";
import api from "../api/hover.api";

export default async function getUsers(getData: JoinRoom, socket: Socket) {
    if(getData.roomId && getData.token) {
        const tokenAuth: Boolean = await api.authToken(getData.token);
        if(!tokenAuth) return;

        const foundClients: openSockets[] = await AppDataSource.getRepository(openSockets).find({ where: { sessionId: getData.roomId } });

        io.to(getData.roomId).emit('add-user', foundClients);
    }
}