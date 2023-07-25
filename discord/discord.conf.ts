type Config = {
    token: string,
    prefix: string,
    botCommandChannels: string[],
    botConsoleChannel: string,
    developerRoles: string[],
    staffRoles: string[],
    statUpdateTime: number,
    statChannel: string,
    statMsgId: string,
    clientId: string,
    managementChannel: string,
    clientSecret: string,
    redirectUrl: string
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
    statMsgId: '1129109544669298739',
    clientId: '1128841767756759080',
    managementChannel: '1133131912827900066',
    clientSecret: 'YR3-Ft8VEL-vYsCxxOXkqHUCGVpSGEaq',
    redirectUrl: 'http://localhost:8081/auth/discord'
}

export default config;