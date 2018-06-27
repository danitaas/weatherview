//from https://github.com/Microsoft/TypeScript-React-Starter/issues/131

import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });
