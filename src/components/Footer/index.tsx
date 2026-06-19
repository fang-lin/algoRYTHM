import {Fragment, FunctionComponent} from 'react';
import {Theme} from '../Theme';
import {FooterWrapper} from './styles';

const links = [
    {href: '/', label: `algoRYTHM ${__APP_VERSION__}`, external: false},
    {href: 'https://github.com/fang-lin/algoRYTHM', label: 'GitHub', external: true},
    {
        href: 'https://www.fanglin.me/',
        label: `Lin Fang in ${new Date().getFullYear()}`,
        external: true,
    },
    {href: 'https://plotter.fanglin.me', label: 'Function Plotter', external: true},
    {href: 'https://game-of-life.fanglin.me/', label: 'Game of Life', external: true},
];

const Footer: FunctionComponent<Theme> = theme => (
    <FooterWrapper {...theme}>
        {links.map(({href, label, external}, index) => (
            <Fragment key={href}>
                {index > 0 && <span>&nbsp;|&nbsp;</span>}
                <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                >
                    {label}
                </a>
            </Fragment>
        ))}
    </FooterWrapper>
);

export default Footer;
