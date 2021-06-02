import { provider } from '../../config/init-pact-authentication';
import { AuthenticationController as controller } from '../../../../src/modules/AuthenticationController';
import { Matchers } from '@pact-foundation/pact';

const credentials = {
    username:"admin",
    password:"password"
}

describe('Given an authentication service', () => {
    beforeAll(async() => {
        await provider.setup();
    });

    describe('When a request to authenticate an user is made', () => {
        beforeAll(async() => {
            await provider.addInteraction({
                state: 'check credentials of user that are correct',
                uponReceiving: 'a request to authenticate an user',
                withRequest: {
                    method: 'POST',
                    path: '/api/latest/users/auth/',
                    body: credentials
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.eachLike({
                        username: Matchers.string("admin"),
                    }, {min: 1})
                }
            });
        });

        test('Then it should return the right data', async() => {
            console.log('<<<>>>>')
            const response = await controller.authenticate(credentials);
            expect(response.data).toMatchSnapshot();

            await provider.verify();
        })

    });

    afterAll(async () => {
        await provider.finalize();
    });
});
