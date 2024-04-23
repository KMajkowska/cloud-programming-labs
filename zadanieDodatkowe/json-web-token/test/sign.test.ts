import sign from "../src/sign"

describe('sign',  () => {
    it('should produce different signatures for different payloads', () =>{
        expect(true).toBe(true);
        const secret = 'shhhh';
        const jwtOne = sign({
            payload: {name: 'Karola'},
            secret,
            options: {expiresIn: 8.64e7}, 
        }).split('.')[2];
        const jwtTwo = sign({
            payload: {name: 'Karola'},
            secret: `${secret} - 133231`,
            options: {expiresIn: 8.64e7}, 
        }).split('.')[2];

        expect(jwtOne).not.toBe(jwtTwo);
    });

    it('should add the expiry to the payload', () => {
        const secret = 'shhhh';
        const jwtOne = sign(
            {
                payload: {name: 'Karola'},
                secret,
                options: {expiresIn: 8.64e7}, 
            }
        ).split('.')[1];

        expect(typeof JSON.parse(atob(jwtOne)).exp).toBe('number');
    }); 
  });