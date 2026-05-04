import {createRoot} from 'react-dom/client';
import React from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import Algorithms from './components/Algorithms';
import injectFonts from './fonts';
import {getRandomThemeKey} from './components/Theme';
import {getRandomAlgorithmKey, paramsToLink} from './functions';

import 'normalize.css/normalize.css';

const dom = document.getElementById('root');

if (dom) {
    createRoot(dom).render(<HashRouter>
        <Routes>
            <Route path="/:themeKey/:algorithmKey/:speedKey/:audioIsEnabledKey" element={<Algorithms/>}/>
            <Route path="*" element={<Navigate to={paramsToLink({
                themeKey: getRandomThemeKey(),
                algorithmKey: getRandomAlgorithmKey(),
                speedKey: '1',
                audioIsEnabledKey: '1'
            })} replace/>}/>
        </Routes>
    </HashRouter>);
}

injectFonts();
