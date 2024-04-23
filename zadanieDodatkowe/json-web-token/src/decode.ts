export interface DecodeInput {
    token: string
}

function decode({token}: DecodeInput) {
    const parts = token.split('.');

    if(parts.length !== 3){
        throw new Error('Invalid JWT');
    }

    const[_, payload] = parts;

    return JSON.parse(atob(payload));
}

export default decode;