<template>
    <div>
        <div>
            <navBar name="Hovercraft.chat | Terms of Service" :buttons='[{"name": "Home", "ref": "showLogin", "value": "true"}, {"name": "Privacy Policy", "ref": "showLogin", "value": "true"}, {"name": "Create an account", "ref": "showLogin", "value": "true"}, {"name": "Donate", "ref": "showLogin", "value": "true"}]'/>
            <div class="h-screen bg-gray-900">
                <div class=" ml-3 mr-3" v-for="item in rules" :key="item.name">
                    <div class="border-b border-gray-500 bg-gray-800 p-3 rounded-lg mt-2">
                        <p class="text-white p-3 mt-2 border-b border-gray-600">{{item.name}}</p>
                        <p class=" mt-2  text-gray-400" v-html="item.value"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navBar from './navBar.vue';

export default {
    data() {
        return {
            rules: [
                {
                    "name": "1. Spam",
                    "value": "Spam of any kind is not permitted this includes but is not limited to excessive mentioning @ of members of the server, excessive posting of the same content within a short period of time, posting content in multiple channels within a short period of time."
                },
                {
                    "name": "2. NSFW (Not Safe For Work)",
                    "value": "Any NSFW content is not permitted anywhere across this discord server or any of our platforms. This includes but is not limited to gore, porn, nudity, death scary content."
                },
                {
                    "name": "3. Racism, Homophobia, Transphobia, Xenophobia",
                    "value": "Racism, Homophobia, Transphobia and Xenophobia are all disallowed within all of our platforms. We do not endorse / promote hate speech and it will not be tolerated on any of our platforms."
                },
                {
                    "name": "4. Cyberattacks, Doxing, Unauthorized data gathering, malware",
                    "value": "<font style='font-size:20px;'>4.1</font> Cyberattacks - All cyberattacks are treated very seriously whether it be a direct attack on hovercraft platforms or an attack on another member of the hovercraft community with most cases even if they are attempts resulting in a permanent ban from all platforms. <br><font style='font-size:20px;'>4.2</font> Doxing - Doxing members of the community or members of staff is not tolerated and will also result in a permanent ban from all hovercraft platforms.<br><font style='font-size:20px;'>4.3</font> Unauthorized Data Gathering - Data gathered from a source without direct implicit permission from the owner will result in punishment dependant on the case and legal claims regarding the source. Use of data gathered for malicious intent will result in permanent ban from all hovercraft platforms.<br><font style='font-size:20px;'>4.4</font> Malware - Malware is disallowed within all hovercraft platforms use of malware on hovercraft platforms will result in a permanent ban from all platforms."
                },
                {
                    "name": "5. Advertising",
                    "value": "Advertising is disallowed across all hovercraft platforms this includes but is not limited to direct messaging members links to sites / promotional content,  using the discord server as a means to share promotional content."
                },
                {
                    "name": "6. Languages",
                    "value": "If you are using a non English language you must use one of the non-English channels to communicate within the discord server. Failure to do so can result in punishment from staff."
                },
                {
                    "name": "7. Staff",
                    "value": "Staff are volunteers and therefore shouldn't be disrespected or treated badly. Disrespecting staff is used as an umbrella term for acts of disrespecting staff this includes but is not limited to mocking staff, using slurs to describe staff, excessive mentioning of staff (may also fall under the spam rule)."
                },
                {
                    "name": "8. Politics / Encouragement of rule breaking / Rule baiting",
                    "value": "8.1 Politics - All political discussions / debates should be kept out of all hovercraft platforms.\n8.2 Encouraging to rule break - Anyone encouraging people to break rules will be treated as rule breakers and therefore punished as one.\n8.3 Rule Baiting - Anyone baiting others into breaking rules or baiting rules will be punished accordingly."
                },
                {
                    "name": "9. Discord Guidelines",
                    "value": "When using any hovercraft platform that is on discord you must be abiding by the discord community guidelines which can be found here: https://discord.com/guidelines."
                }
            ]
        }
    },
    components: {
        navBar
    }
}
</script>