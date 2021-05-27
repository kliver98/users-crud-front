import { provider } from '../../config/init-pact-user';
import { UserController as controller } from '../../../../src/modules/UserController';
import { Matchers } from '@pact-foundation/pact';

const user = {
    lastname:"admin2",
    firstname:"admin2",
    username:"admin2",
    id_type:"CC",
    _id:100002,
    password:"admin2",
    photo:"",
    active:true,
}

describe('Given an user service', () => {
    beforeAll(async() => {
        await provider.setup();
    });

    describe('When a request to create an user is made', () => {
        beforeAll(async() => {
            await provider.addInteraction({
                state: 'create an user',
                uponReceiving: 'a request to create an user',
                withRequest: {
                    method: 'POST',
                    path: '/api/latest/users',
                    body: user
                },
                willRespondWith: {
                    status: 201
                }
            });
        });

        test('Then it should return the right data', async() => {
            const response = await controller.create(user);
            expect(response.data).toMatchSnapshot();

            await provider.verify();
        })

    });

    afterAll(async () => {
        await provider.finalize();
    });
});
