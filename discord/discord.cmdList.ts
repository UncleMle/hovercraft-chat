type CommandList = { commandName: string, desc: string };

let commands : CommandList[] = [
    { commandName: 'help', desc: 'Displays all commands' },
    { commandName: 'stats', desc: 'View all curent service stats' },
    { commandName: 'accinfo', desc: 'View information about a specific account via UUID' }
]

export default commands;