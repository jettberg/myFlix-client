import { createRoot }  from  'react-dom/client';
import { MainView } from './components/main-view/main-view';
import "./index.scss";


const MyFlixApplication = () => {
    return (
        // <div className="my-flix">
        //     <div>Good morning</div>
        // </div>
        <MainView />
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);