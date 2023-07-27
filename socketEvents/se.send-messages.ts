import { SendData } from "@types";
import { AppDataSource } from "../db/data-source";
import { webTokens } from "../db/entities/hover.webTokens";
import sendApi from "../discord/hover.discord";
import { Socket } from "socket.io";
import conf from '../discord/discord.conf';

export default async function sendMessage(data: string, socket: Socket) {
    if(!data.length) return;
    const sendData: SendData = JSON.parse(data);

    const tokenData: webTokens = await AppDataSource.getRepository(webTokens).findOne({ where: { token: sendData.token } });

    if(tokenData) {
        console.log(tokenData.sessionId, sendData.message);
        socket.to(tokenData.sessionId).emit('recieve-message', sendData.message);
    } else return sendApi.channelSend(conf.managementChannel, `Socket with ID `+"``"+socket.id+"``"+`attempted to send a message with an invalid room id.`);
}

