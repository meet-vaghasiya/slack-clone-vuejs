<template>
    <div class="my-auto">
        <div class="p-2 mx-auto md:w-1/2 lg:w-1/3 text-content-primary">
            <div class="flex flex-col items-center justify-center gap-y-5">
                <div class="flex items-center justify-center gap-x-2">
                    <svg class="w-8 h-8" viewBox="0 0 128 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="slack-logo-mark">
                            <g id="Group">
                                <path id="Fill-10" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M26.8949 81.6834C26.8949 89.1104 20.8745 95.1309 13.4475 95.1309C6.02048 95.1309 0 89.1104 0 81.6834C0 74.2564 6.02048 68.236 13.4475 68.236H26.8949V81.6834Z"
                                    fill="#E01E5A" />
                                <path id="Fill-11" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M33.6187 81.6834C33.6187 74.2564 39.6391 68.236 47.0661 68.236C54.4931 68.236 60.5136 74.2564 60.5136 81.6834V115.302C60.5136 122.729 54.4931 128.75 47.0661 128.75C39.6391 128.75 33.6187 122.729 33.6187 115.302V81.6834Z"
                                    fill="#E01E5A" />
                                <path id="Fill-12" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M47.0661 27.8936C39.6391 27.8936 33.6187 21.8731 33.6187 14.4461C33.6187 7.01914 39.6391 0.998657 47.0661 0.998657C54.4931 0.998657 60.5136 7.01914 60.5136 14.4461V27.8936H47.0661Z"
                                    fill="#36C5F0" />
                                <path id="Fill-13" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M47.0661 34.6173C54.4931 34.6173 60.5136 40.6378 60.5136 48.0648C60.5136 55.4918 54.4931 61.5123 47.0661 61.5123H13.4475C6.02048 61.5123 0 55.4918 0 48.0648C0 40.6378 6.02048 34.6173 13.4475 34.6173H47.0661Z"
                                    fill="#36C5F0" />
                                <path id="Fill-14" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M100.856 48.0648C100.856 40.6378 106.876 34.6173 114.303 34.6173C121.73 34.6173 127.751 40.6378 127.751 48.0648C127.751 55.4918 121.73 61.5123 114.303 61.5123H100.856V48.0648Z"
                                    fill="#2EB67D" />
                                <path id="Fill-15" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M94.1322 48.0648C94.1322 55.4918 88.1118 61.5123 80.6848 61.5123C73.2578 61.5123 67.2373 55.4918 67.2373 48.0648V14.4461C67.2373 7.01914 73.2578 0.998657 80.6848 0.998657C88.1118 0.998657 94.1322 7.01914 94.1322 14.4461V48.0648Z"
                                    fill="#2EB67D" />
                                <path id="Fill-16" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M80.6848 101.855C88.1118 101.855 94.1322 107.876 94.1322 115.302C94.1322 122.729 88.1118 128.75 80.6848 128.75C73.2578 128.75 67.2373 122.729 67.2373 115.302V101.855H80.6848Z"
                                    fill="#ECB22E" />
                                <path id="Fill-17" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M80.6848 95.1309C73.2578 95.1309 67.2373 89.1104 67.2373 81.6834C67.2373 74.2564 73.2578 68.236 80.6848 68.236H114.303C121.73 68.236 127.751 74.2564 127.751 81.6834C127.751 89.1104 121.73 95.1309 114.303 95.1309H80.6848Z"
                                    fill="#ECB22E" />
                            </g>
                        </g>
                    </svg>
                    <span class="text-base font-bold">slack</span>
                </div>
                <p class="text-4xl font-bold">Check your email for a code</p>
                <p>We'have sent 6-digit code to <span class="font-bold">{{ store.email }}</span>. The code expires shorly,
                    so
                    please enter it soon.</p>
                <div class="flex mx-auto gap-x-3">
                    <OtpInput v-model="otp" />
                </div>
                <button class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" class="w-6 h-6" viewBox="0 0 48 48">
                        <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
                        <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
                        <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17">
                        </polygon>
                        <path fill="#c62828"
                            d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z">
                        </path>
                        <path fill="#fbc02d"
                            d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z">
                        </path>
                    </svg>
                    <span>
                        Open gmail
                    </span>
                </button>
                <p>Can't find your code? Check your spam folder</p>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axiosInstance from '../api/axios';
import OtpInput from '../components/common/OtpInput.vue'
import { ref, watch } from 'vue'
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
const otp = ref("")
const store = useUserStore()
const router = useRouter()
watch(otp, (newValue) => {
    if (newValue.length === 6) {
        validateOtp(newValue)
    }
})
type ResponseType = {
    message: string
    token: string
    user: {
        id: number
        email: string
        is_vertified: boolean
        created_at: string
        updated_at: string
    }
}
const validateOtp = async (otp: string) => {
    try {
        const data = await axiosInstance.post<ResponseType>('/register/verify', {
            email: store.email,
            otp: otp
        })
        store.setUserToken(data.data.token)
        store.setUser(data.data.user)

        router.push({ name: 'ProfileSetup' })

    } catch (error) {
        console.error(error, 'error')
    }

}

</script>