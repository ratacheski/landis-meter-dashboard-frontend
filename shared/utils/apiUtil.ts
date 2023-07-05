export function getBaseUrl() {
    return process.env.BASE_SSR_URL || 'http://localhost:8080'
}

export function getPublicBaseUrl() {
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
}