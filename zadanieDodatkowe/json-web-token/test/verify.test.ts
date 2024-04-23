import {verify, sign} from '../src'

describe('verify', () => {
    it('should verify and decode a valid token', () => {
        const secret = 'shhhh';

        const token = sign(
            {
                payload: {name: 'Karola'},
                secret,
            }
        );

        const verified = verify(
            {
                token,
                secret
            }
        );

        expect(verified.name).toBe('Karola');
    });

    it('should throw if the signature is invalid', () => {
        const secretOne = 'shhhh';
        const secretTwo = 'szszszsz';

        const token = sign(
            {
                payload: {name: 'Karola'},
                secret: secretOne,
            }
        );

        try {
            verify(
                {
                    token,
                    secret: secretTwo
                }
            );
        } catch(e) {
            expect(e.message).toBe('Invalid signature')
        }
    });

    it('should throw if the token has expired', () => {
        const secret = 'shhhh';

        const token = sign(
            {
                payload: {name: 'Karola'},
                secret,
                options: {
                    expiresIn: -8.64e7
                }
            }
        );

        try{
            verify(
                {
                    token,
                    secret
                }
            )
        } catch(e){
            expect(e.message).toBe('Token has expired');
        }
    });

});