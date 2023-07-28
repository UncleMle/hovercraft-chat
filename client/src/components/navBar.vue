<template>
    <nav class="h-20 bg-gray-800 border-b border-gray-600">

        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 pb-6">
            <a class="flex absolute left-5 top-0 mt-4">
                <img src="https://i.imgur.com/CYMxvyh.png" class="h-14 mr-5" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white pr-11">{{name}}</span>
            </a>
            <div class="absolute right-5 top-0 mt-3">
                <div class="md:block" id="navbar-default">
                    <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 justify-center">
                        <div v-for="item in buttons" :key="item.name">
                            <button class="ease-in-out duration-300 bg-[#10151c] text-white p-3 rounded-lg mt-1 hover:bg-gray-700 hover:p-4" @click="stateShift(item.ref, item.value)" v-html="item.name"></button>
                        </div>
                    </ul>
                    </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['name', 'buttons'],
    methods: {
        stateShift(stateItem) {
            this.$router.push(stateItem.toLowerCase());
        }
    }
}
</script>