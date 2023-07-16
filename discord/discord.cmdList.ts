type CommandList = { commandName: string, desc: string };

let commands : CommandList[] = [
    { commandName: 'help', desc: 'Displays all commands' },
    { commandName: 'stats', desc: 'View all curent service stats' }
]

export default commands;