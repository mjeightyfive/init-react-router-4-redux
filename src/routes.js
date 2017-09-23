import Home from './containers/Home';
import Step1 from './containers/Step1';
import Step2 from './containers/Step2';
import Step3 from './containers/Step3';
import NoMatch from './containers/NoMatch';

const routes = [{
    path: '/',
    exact: true,
    component: Home
}, {
    path: '/step1',
    component: Step1
}, {
    path: '/step2',
    component: Step2
}, {
    path: '/step3',
    component: Step3
}, {
    path: '*',
    component: NoMatch
}];

export default routes;
