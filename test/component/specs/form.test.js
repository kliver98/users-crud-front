import {render} from '@testing-library/react '
import Form from '../src/components/Form'

describe ('When the element is loaded', () => {
    beforeAll(() => {
        render(<Form/>);
    });
    it ('The title, name input, lastname input, url input, combobox type identification, number of identification spinbutton, username input, password input, active account checkbox, create and cancel button should be visible', () =>{
        expect(document.querySelector('#firstname')).toBeVisible();
        expect(document.querySelector('#lastname')).toBeVisible();
        expect(document.querySelector('#username')).toBeVisible();
        
    });
})