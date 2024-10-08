export const editModalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    bgcolor: '#00000080',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export const editBoxStyle = {
    bgcolor: 'background.paper',
    padding: 2,
    borderRadius: 2,
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
}

export const editTeamButtonSection = {
    width: '50%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
}

export const editTeamScrollBox = {
    width: '80%',
    maxHeight: '50vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mb: 2,
    border: 3,
    borderColor: 'divider',
    borderRadius: 2,
}