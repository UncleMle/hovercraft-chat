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
    token: "", // Bot token
    prefix: "=", // Cmd Prefix
    botCommandChannels: ['', ''], // Channel IDs
    botConsoleChannel: '', // Channel ID
    developerRoles: [''], // Role Names eg: Developer Team
    staffRoles: [''], // Role Names eg: Staff Team
    statUpdateTime: 10, // Update time for stat edit
    statChannel: '', // Channel ID
    statMsgId: '', // Channel ID
    clientId: '', // Bot Client ID
    managementChannel: '', // Channel Id
    clientSecret: '', // Bot Client Secret
    redirectUrl: 'http://localhost:8081/auth/discord'
}

export default config;