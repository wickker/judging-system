// import type { Handle } from "@sveltejs/kit";

// const securityHeaders = {
//     // 'Cross-Origin-Embedder-Policy': 'require-corp',
//     // 'Cross-Origin-Opener-Policy': 'same-origin',
//     // // [...]
//     // 'X-XSS-Protection': '0',
//     'Referrer-Policy': 'no-referrer-when-downgrade'
// }

// export const handle: Handle = async ({ event, resolve }) => {
//     const response = await resolve(event);
//     Object.entries(securityHeaders).forEach(
//         ([header, value]) => response.headers.set(header, value)
//     );

//     return response;
// }