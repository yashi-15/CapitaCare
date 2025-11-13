import toast from 'react-hot-toast'

const showToast = (success,message) => {
    const msg = success? `✔️ ${message}`: `❌ ${message}`
    toast( msg)
}

export default showToast