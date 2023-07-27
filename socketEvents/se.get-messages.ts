import { JoinRoom, SessionUser } from "@types";
import { AppDataSource } from "../db/data-source";
import { Sessions } from "../db/entities/hover.sessions";
import io from "../hover.socketEvents";
import { Socket } from "socket.io";
import api from '../api/hover.api';

export default async function getMessages(requestData: JoinRoom, socket: Socket) {
    if(requestData.roomId && requestData.token && await api.authToken(requestData.token)) {
        const foundSession: Sessions = await AppDataSource.getRepository(Sessions).findOne({ where: { sessionId: requestData.roomId } });
        if(!foundSession) return;

        let sessionUsers: any = foundSession.users;
        if(!sessionUsers) return;

        let idx = null;
        sessionUsers.find(function(item: SessionUser, i: number) {
            if(item.token == requestData.token) {
                idx = i;
            }
        });

        idx?io.to(requestData.roomId).emit('get-messages', foundSession.messages):(null);
    }
}