import React, { useEffect } from 'react';
import clsx from 'clsx';
import data from '../assets/util'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import Flag from '../assets/imgsvg/flag.svg'
import Badge from '@material-ui/core/Badge';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));




export default function Demo() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [flagCount, setFlagCount] = React.useState(0);
    const [unreadCount, setUnreadCount] = React.useState(0);
    const [searchtext, setSearchText] = React.useState('')
    const [searcharray, setsearch] = React.useState([])

    const [ArrayList, SetArrayList] = React.useState(data)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const deleteItem = (element) => {
        const items = ArrayList.filter(item => item.id !== element.id);
        let unreadCount = items.filter(item => item.isRead === false)
        setUnreadCount(unreadCount.length)
        let flagarray = items.filter(item => item.isFlag === true)
        setFlagCount(flagarray.length)
        SetArrayList(items)

    }
    const read = (im) => {

        im.isRead = true
        let unreadCount = ArrayList.filter(item => item.isRead === false)
        setUnreadCount(unreadCount.length)

    }

    const onFlag = (im) => {
        im.isFlag = true
        let flagarray = ArrayList.filter(item => item.isFlag === true)
        setFlagCount(flagarray.length)
    }
    const onUnFlag = (im) => {
        im.isFlag = false
        let flagarray = ArrayList.filter(item => item.isFlag === true)
        setFlagCount(flagarray.length)

    }
    useEffect(() => {
        let flagarray = ArrayList.filter(item => item.isFlag === true)
        setFlagCount(flagarray.length)
        let unreadCount = ArrayList.filter(item => item.isRead === false)
        setUnreadCount(unreadCount.length)
    }, [])

    const SearchHandler = (e) => {
        console.log(e.target.value.length);
        setSearchText(e.target.value)
        setsearch(ArrayList)
        let msg = ArrayList
        console.log(msg);
        if (!e.target.value) {
            console.log(msg);
            console.log(" in side ", e.target.value.length);
            SetArrayList(msg)
            // return ArrayList
            console.log(ArrayList);
        } else {

            let filtered = ArrayList.filter(item => {
                if (item.message.includes(e.target.value)) {
                    return item
                } else {
                    return;
                }
            })
            setsearch(filtered)

            // let data = searching(ArrayList, e.target.value)
            // setsearch(data)
            // SetArrayList(data)

            // console.log(searcharray);
        }

    }

    const searching = (value, arg) => {
        let filtered = value.filter(item => {
            if (item.message.includes(arg)) {
                return item
            } else {
                return;
            }
        })
        if (filtered.length > 0) {
            return filtered
        } else {
            return value

        }
        // SetArrayList(filtered)
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{ background: 'white' }}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <TextField id="outlined-search" onChange={(e) => SearchHandler(e)} label="Search field" type="search" variant="outlined" />

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon />

                    </IconButton>
                </div>
                <Divider />
                <List>

                    <ListItem button >


                        <ListItemIcon>
                            <Badge badgeContent={unreadCount} >
                                <InboxIcon />
                            </Badge>
                        </ListItemIcon>

                        <ListItemText>Inbox</ListItemText>
                    </ListItem>
                    <ListItem button >
                        <ListItemIcon>
                            <Badge badgeContent={flagCount} >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" /></svg>

                            </Badge>
                        </ListItemIcon>
                        <ListItemText>Flagged</ListItemText>

                        <ListItemText />
                    </ListItem>

                </List>


            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <List>
                    {searchtext.length > 0 ? <div>
                        {searcharray.map((text, index) => (
                            <ListItem button key={text.id}>
                                <ListItemText primary={text.message} onClick={() => read(text)} />

                                <DeleteIcon onClick={() => deleteItem(text)} ></DeleteIcon>
                                <div>

                                    {text.isFlag ?
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => onUnFlag(text)} height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" /></svg> :
                                        <img className="imges" src={Flag} alt="" onClick={() => onFlag(text)} />

                                    }
                                </div>


                            </ListItem>
                        ))}</div> : <div>
                        {ArrayList.map((text, index) => (
                            <ListItem button key={text.id}>
                                <ListItemText primary={text.message} onClick={() => read(text)} />

                                <DeleteIcon onClick={() => deleteItem(text)} ></DeleteIcon>
                                <div>

                                    {text.isFlag ?
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => onUnFlag(text)} height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" /></svg> :
                                        <img className="imges" src={Flag} alt="" onClick={() => onFlag(text)} />

                                    }
                                </div>


                            </ListItem>
                        ))}
                    </div>}
                </List>


            </main>
        </div>
    );
}
