import {createRoot} from 'react-dom/client';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Algorithms from './components/Algorithms';
import NotFound from './components/NotFound';
import injectFonts from './fonts';
import {getRandomThemeKey} from './components/Theme';
import {getRandomAlgorithmKey, paramsToLink} from './functions';

import 'normalize.css/normalize.css';

const dom = document.getElementById('root');

if (dom) {
    createRoot(dom).render(
        <BrowserRouter>
            <Routes>
                <Route
                    path="/:themeKey/:algorithmKey/:speedKey/:audioIsEnabledKey"
                    element={<Algorithms />}
                />
                <Route
                    path="/"
                    element={
                        <Navigate
                            to={paramsToLink({
                                themeKey: getRandomThemeKey(),
                                algorithmKey: getRandomAlgorithmKey(),
                                speedKey: '1',
                                audioIsEnabledKey: '1',
                            })}
                            replace
                        />
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

injectFonts();
