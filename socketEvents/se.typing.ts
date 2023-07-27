import api from "@api";
import { RoomData } from "@types";
import { AppDataSource } from "db/data-source";
import { Sessions } from "db/entities/hover.sessions";
import { Session } from "inspector";
import { Socket } from "socket.io";
import { Repository } from "typeorm";

export default async function typingState(data: RoomData, socket: Socket): Promise<void | boolean> {
    if(data && socket) {
        const tokenAuth = await api.authToken(data.token);
        if(!tokenAuth) return;

        const sessionFind: Sessions = await AppDataSource.getRepository(Sessions).findOne({ where: { sessionId: data.roomId } });



    }
}