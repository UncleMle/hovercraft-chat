import { JoinRoom } from "@types";
import { Socket } from "socket.io";
import api from "../api/hover.api";
import { openSockets } from "../db/entities/hover.openSockets";
import { AppDataSource } from "../db/data-source";
import { Sessions } from "../db/entities/hover.sessions";
import { webTokens } from "../db/entities/hover.webTokens";
import sendApi from "../discord/hover.discord";
import conf from '../discord/discord.conf';

export default async function joinRoom(joinData: JoinRoom, socket: Socket) {
        if(joinData.roomId && joinData.token) {

            if(!await api.authToken(joinData.token)) return;

            const findCurrentSockets: openSockets[] = await AppDataSource.getRepository(openSockets).find({ where: { socketId: socket.id } });

            if(findCurrentSockets.length > 0) {

                findCurrentSockets.forEach((socket: openSockets) => {
                    AppDataSource.getRepository(openSockets).delete({ id: socket.id });
                })

            }

            const findRoom: Sessions = await AppDataSource.getRepository(Sessions).findOne({ where: { sessionId: joinData.roomId } });
            const findToken: webTokens = await AppDataSource.getRepository(webTokens).findOne({ where: { token: joinData.token } });
            if(!findToken) return sendApi.channelSend(conf.managementChannel, `A level two token access validation error occured within process ID: ${process.getuid} | Token: ${joinData.token}`);
            if(!findRoom) return;

            let users: any = findRoom.users;
            users == null? users = []: (null);

            users.push({ socketId: socket.id, token: joinData.token });

            AppDataSource.getRepository(Sessions).update({ sessionId: joinData.roomId }, { users: users });

            const findOpenSocket: openSockets = await openSockets.findOne({ where: { token: joinData.token } });

            if(findOpenSocket) {
                socket.join(joinData.roomId), api.Log(`Room with ID ${joinData.roomId} was joined`)
                return;
            }

            const newOpenSocket = new openSockets();
            newOpenSocket.token = joinData.token;
            newOpenSocket.socketId = socket.id;
            newOpenSocket.sessionId = joinData.roomId;

            let socketSQLID: number;

            AppDataSource.getRepository(openSockets).save(newOpenSocket)
            .then(saveData => { socketSQLID == saveData.id })
            .then(() => {
                findRoom?(
                    socket.join(joinData.roomId), api.Log(`Room with ID ${joinData.roomId} was joined`)
                ): (
                    sendApi.channelSend(conf.managementChannel, `Room with ID `+"``"+joinData.roomId+"``"+`attempted to be joined but server failed request.`)
                );
            })
        }
}