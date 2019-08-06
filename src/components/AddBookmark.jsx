import React, {useState, useEffect, useReducer} from 'react';
import axios from 'axios/index';
import {makeStyles} from '@material-ui/styles/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import {Dropdown, TextField} from './inputs/MaterialInputs';
import ChunkyButton from './inputs/ChunkyButton';

const useStyles = makeStyles({
    root: {
        fontFamily: ['"Lato"', 'sans-serif'],
        fontSize: 13,
        borderBottom: '1px solid #eeeeee',
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: 42,
        '&:hover': {
            color: '#7e17ea',
            background: 'transparent'
        }
    }
});

const initialState = {
    dropItems: [],
    tabUrl: '',
    tabTitle: ''
};

function reducer(state, action) {
    switch (action.type) {
        case 'ddl':
            return {...state, dropItems: action.payload.sort((a,b) => a.sequence - b.sequence)};
        case 'tabData':
            return {...state, tabUrl: action.url, tabTitle: action.title};
    }

}

function AddBookmark(props) {
    const classes = useStyles();
    const token = localStorage.getItem('JWT');
    const [state, dispatch] = useReducer(reducer, initialState);

    const [message, setMessage] = useState('');
    const [parentId, setParent] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');


    useEffect(() => {
        axios.get('https://astrostore.io/api/collection/all', {
            headers: {Authorization: `JWT ${token}`}
        }).then(res => {
            dispatch({type: 'ddl', payload: res.data});
        });

        // const currentUrl = chrome.tab.url;
        // const currentTitle = chrome.tab.title;
        // dispatch({type: 'tabData', url: currentUrl, title: currentTitle});

    }, [token]);


    const addBookmark = () => {
        axios.post('https://astrostore.io/api/bookmark/create',
            {title: title, url: url, parentId: parentId},
            {headers: {Authorization: `JWT ${token}`}}
        ).then(res =>
                res.data.success
                    ? setMessage('Success!')
                    : setMessage('Error Adding Bookmark :(')
        )
    };

    const logout = () => {
        localStorage.removeItem('JWT');
        setTimeout(() => props.update(), 10);
    };

    return (
        <div className='container'>

            <div className='modalHeader'>New Bookmark</div>
            <div className='modalMessage'>{message}</div>

            <div className='fieldWrapper'>

                <TextField
                    label='Bookmark Title'
                    placeholder=''
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label='Bookmark Url'
                    placeholder=''
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Dropdown
                    label='Collection'
                    value={parentId}
                    onChange={(e) => setParent(e.target.value)}
                >
                    {
                        state.dropItems.map(c =>
                            <MenuItem value={c._id} key={c._id} className={classes.root} >
                                {c.title}
                            </MenuItem>
                        )
                    }
                </Dropdown>

            </div>

            <div className='submitWrapper'>
                <ChunkyButton
                    onPress={() => addBookmark()}
                    text={'Submit'}
                    type={'primary'}
                />
            </div>

            <div onClick={() => logout()} className='logOut'>Log Out</div>
        </div>
    );
}


export default AddBookmark;