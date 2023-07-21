type CommandList = { commandName: string, desc: string };

let commands : CommandList[] = [
    { commandName: 'help', desc: "Displays all commands" },
    { commandName: 'servicestats', desc: "View all current service stats" },
    { commandName: 'accinfo', desc: "View information about a specific account via SQLID" },
    { commandName: 'banacc', desc: "Ban user via SQLID" },
    { commandName: 'unbanacc', desc: 'Unban user via SQLID' }
]

export default commands;