import { Server, Socket } from 'socket.io';
import { AppDataSource } from './db/data-source';
import { webTokens } from './db/entities/hover.webTokens';
import api from './api/hover.api';
import { createServer } from 'http';
import app from './hover.core';
import { SendData, SessionUser } from './shared/hover.types';;
import { Join, Repository } from 'typeorm';
import { Sessions } from './db/entities/hover.sessions';
import sendApi from './discord/hover.discord';
import conf from './discord/discord.conf';
import { openSockets } from './db/entities/hover.openSockets';
import { JoinRoom } from './shared/hover.types';

const httpServer = createServer(app);
export const io : Server = new Server(httpServer, { cors: { origin: 'http://localhost:8080' } });

const sessionRepo: Repository<Sessions> = AppDataSource.getRepository(Sessions);
const tokenRepo: Repository<webTokens> = AppDataSource.getRepository(webTokens);
const openSocketRepo: Repository<openSockets> = AppDataSource.getRepository(openSockets);

io.on('connection', (socket: Socket): void => {
    api.Log(`Socket ID ${socket.id} has connected`);

    socket.on('send-message', async(data: string): Promise<void | boolean> => {
        const sendData: SendData = JSON.parse(data);

        const tokenData: webTokens = await tokenRepo.findOne({ where: { token: sendData.token } });

        if(tokenData) {
            console.log(tokenData.sessionId, sendData.message);
            socket.to(tokenData.sessionId).emit('recieve-message', sendData.message);
        } else return sendApi.channelSend(conf.managementChannel, `Socket with ID `+"``"+socket.id+"``"+`attempted to send a message with an invalid room id.`);

    })

    socket.on('join-room', async(joinData: JoinRoom) => {

        if(joinData.roomId && joinData.token) {

            if(!await api.authToken(joinData.token)) return;

            const findCurrentSockets: openSockets[] = await openSocketRepo.find({ where: { socketId: socket.id } });

            if(findCurrentSockets.length > 0) {

                findCurrentSockets.forEach((socket: openSockets) => {
                    openSocketRepo.delete({ id: socket.id });
                })

            }

            const findRoom: Sessions = await sessionRepo.findOne({ where: { sessionId: joinData.roomId } });
            const findToken: webTokens = await tokenRepo.findOne({ where: { token: joinData.token } });
            if(!findToken) return sendApi.channelSend(conf.managementChannel, `A level two token access validation error occured within process ID: ${process.getuid} | Token: ${joinData.token}`);
            if(!findRoom) return;

            let users: any = findRoom.users;
            users == null? users = []: (null);

            users.push({ socketId: socket.id, token: joinData.token });

            sessionRepo.update({ sessionId: joinData.roomId }, { users: users });

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

            openSocketRepo.save(newOpenSocket)
            .then(saveData => { socketSQLID == saveData.id })
            .then(() => {
                findRoom?(
                    socket.join(joinData.roomId), api.Log(`Room with ID ${joinData.roomId} was joined`)
                ): (
                    sendApi.channelSend(conf.managementChannel, `Room with ID `+"``"+joinData.roomId+"``"+`attempted to be joined but server failed request.`)
                );
            })
        }
    });


    socket.on('get-users', async(getData: JoinRoom) => {

        if(getData.roomId && getData.token) {
            const tokenAuth: Boolean = await api.authToken(getData.token);
            if(!tokenAuth) return;

            const foundClients: openSockets[] = await openSocketRepo.find({ where: { sessionId: getData.roomId } });

            io.to(getData.roomId).emit('add-user', foundClients);
        }

    })

    socket.on('get-messages', async(requestData: JoinRoom) => {
        if(requestData.roomId && requestData.token && await api.authToken(requestData.token)) {
            const foundSession: Sessions = await sessionRepo.findOne({ where: { sessionId: requestData.roomId } });
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
    })

    socket.on('disconnect-server', async() => {
        const socketFind: openSockets = await openSocketRepo.findOne({ where: { socketId: socket.id } });
        const sessionFind: Sessions = socketFind? await sessionRepo.findOne({ where: { sessionId: socketFind.sessionId} }): (null);

        if(sessionFind) {
            const users: any = sessionFind.users;

            let idx = null;
            users.find(function(item: SessionUser, i: number) {
                if(item.socketId == socket.id) {
                    idx = i;
                }
            })
            idx? users.splice(1, idx):(null);
            sessionRepo.update({ sessionId: sessionFind.sessionId }, { users: users });
        }

        socketFind?openSocketRepo.delete({ id: socketFind.id }):(null);

        api.Log(`${socket.id} was disconnected`);
    })
});




httpServer.listen(3000);


export default true;
