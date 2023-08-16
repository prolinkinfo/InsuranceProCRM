import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Card, Container, Stack } from '@mui/material';
import Email from './email/Email'
import Call from './calls/Call'
import Meeting from './meeting/Meeting'
import Task from './task/Task'

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Index = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Box sx={{ width: '100%' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        History
                    </Typography>
                </Stack>
                {/* <Card> */}
                <Card>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Calls" {...a11yProps(0)} />
                            <Tab label="Meetings" {...a11yProps(1)} />
                            <Tab label="Emails" {...a11yProps(2)} />
                            <Tab label="Tasks" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Call />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Meeting />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Email />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <Task />
                    </CustomTabPanel>
                    {/* </Card> */}
                </Card>
            </Box>
        </Container >
    );
}

export default Index