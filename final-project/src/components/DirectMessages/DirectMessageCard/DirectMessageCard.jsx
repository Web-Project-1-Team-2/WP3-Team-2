import PropTypes from 'prop-types';
import { Avatar, Box, CardActionArea, Divider, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/authContext';
import { useListVals, useObjectVal } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import { directMessagesCardAvatarOnline, directMessagesCardStyling, dmCardMessageStyling, dmUnreadIndicator } from './directMessagesCardStyling';

const DirectMessageCard = ({ directMessageId }) => {

    const { userData } = useContext(AppContext);

    const [directMessageInfo] = useObjectVal(ref(db, `directMessages/${directMessageId}/members`));

    const [directMessages] = useListVals(ref(db, `directMessages/${directMessageId}/messages`));

    const [recipientUser, setRecipient] = useState('')
    const [users] = useObjectVal(ref(db, 'users'));

    const lastMessage = directMessages?.[directMessages.length - 1];

    const [unreadMessages, setUnreadMessages] = useState([]);


    useEffect(() => {
        if (!directMessages) return;
        if (!userData) return;
        if (!directMessageInfo) return;

        const unreadMessages = directMessages.filter(message => message.timestamp > directMessageInfo[userData.username].lastAtChat && 'id' in message);

        setUnreadMessages(unreadMessages);
    }, [directMessages, directMessageInfo, userData]);

    useEffect(() => {
        if (!directMessageInfo) return;
        if (!userData) return;
        if (!users) return;

        const currRecipient = users[Object.keys(directMessageInfo).filter(member => member !== userData?.username)[0]];

        setRecipient(currRecipient);
    }, [directMessageInfo, users, userData])

    const navigate = useNavigate();

    return (
        <>
            <CardActionArea onClick={() => navigate(`/dm/${directMessageId}`)} sx={directMessagesCardStyling}>
                <Grid container alignItems={'center'}>
                    <Grid container item xs={3} alignItems={'center'} justifyContent={'center'} >
                        <Box position={'relative'}>
                            <Avatar
                                src={recipientUser?.avatar}
                                sx={{ width: '50px', height: '50px', mr: 2 }}
                            >
                                {!recipientUser?.avatar && (recipientUser ? recipientUser.username[0].toUpperCase() : 'T')}
                            </Avatar>
                            {recipientUser?.status === "online" &&
                                <Box position={'absolute'}
                                    bgcolor={'green'}
                                    sx={directMessagesCardAvatarOnline} />
                            }
                        </Box>
                    </Grid>
                    <Grid item
                        xs={unreadMessages.length > 0 ? 6 : 9}
                        container
                        direction={'column'}
                        alignItems={'flex-start'}>
                        <Typography variant='h6' >
                            {recipientUser.username}
                        </Typography>
                        <Typography variant='body2' sx={dmCardMessageStyling} >
                            {lastMessage?.author === userData?.username ? 'You' : lastMessage?.author}: {lastMessage?.text}
                        </Typography>
                    </Grid>
                    {unreadMessages.length > 0 &&
                        <Grid item xs={3}>
                            <Box sx={dmUnreadIndicator}>
                                <Typography variant='body2' align='center' color={'white'}>{unreadMessages.length}</Typography>
                            </Box>
                        </Grid>
                    }
                </Grid>
            </CardActionArea>
            <Divider />
        </>
    )
}

DirectMessageCard.propTypes = {
    directMessageId: PropTypes.string.isRequired,
};

export default DirectMessageCard
