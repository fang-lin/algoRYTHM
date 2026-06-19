import {FunctionComponent} from 'react';
import {NavLink} from 'react-router-dom';
import {Theme, ThemeKeys} from '../Theme';
import {useTypedParams} from '../../hooks/useTypedParams';
import {List, ListItem} from './styles';
import {paramsToLink} from '../../functions';

const ThemeBar: FunctionComponent<Theme> = theme => {
    const params = useTypedParams();
    return (
        <div>
            <List>
                {ThemeKeys.map(themeKey => (
                    <ListItem {...theme} key={themeKey}>
                        <NavLink to={paramsToLink({...params, themeKey})}>{themeKey}</NavLink>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ThemeBar;

export * from './functions';
