type Config = {
    token: string,
    prefix: string,
    botCommandChannels: string[],
    botConsoleChannel: string,
    developerRoles: string[],
    staffRoles: string[],
    statUpdateTime: number,
    statChannel: string,
    statMsgId: string
};

const config : Config = {
    token: "MTEyODg0MTc2Nzc1Njc1OTA4MA.Gj8-Ek.qP8AhlubB3Ib8BOXSFx2PoafnkIec_VNyl9Fpo",
    prefix: "=",
    botCommandChannels: ['1129540425544376320', '1128890078387769475'],
    botConsoleChannel: '1128890846981410837',
    developerRoles: ['Developer', 'Founder and Lead Developer'],
    staffRoles: ['Staff Team'],
    statUpdateTime: 10,
    statChannel: '1128895284106240114',
    statMsgId: '1129109544669298739'
}

export default config;