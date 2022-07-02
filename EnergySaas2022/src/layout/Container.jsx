import {PropTypes} from 'prop-types';

const Container = ({children}) => (
        <main className="max-w-screen-xl h-full w-full mx-auto flex flex-col flex-auto">
        {children}
        </main>
    );

Container.propTypes = {
    children: PropTypes.node.isRequired
};

export default Container;
