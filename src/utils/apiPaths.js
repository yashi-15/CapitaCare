export const BASE_URL = "http://localhost:8000"

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        GET_USER_INFO: "/api/auth/getUser"
    },
    TRANSACTION: {
        FETCH: "/api/transactions",
        ADD: "/api/transactions",
        UPDATE: (transactionId) => `/api/transactions/${transactionId}`,
        DELETE: (transactionId) => `/api/transactions/${transactionId}`
    },
    DASHBOARD: "/api/dashboard"
}
