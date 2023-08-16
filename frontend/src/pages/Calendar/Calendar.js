/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Container from '@mui/material/Container';
import { Button, Stack, Typography } from '@mui/material';
import moment from 'moment';
import Iconify from '../../components/iconify/Iconify';
import AddEvent from '../../components/event/AddEvent';
import { apidelete, apiget } from '../../service/api';
import ViewEdit from '../../components/event/ViewEdit'

const Calendar = () => {
    const [userAction, setUserAction] = useState(null)
    const [data, setData] = useState([]);
    const [taskId, setTaskId] = useState('')
    const [open, setOpen] = useState(false);
    const [openViewEdit, setOpenViewEdit] = useState(false)

    const userid = localStorage.getItem('user_id')
    const userRole = localStorage.getItem("userRole")

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenViewEdit = () => setOpenViewEdit(true)
    const handleCloseViewEdit = () => setOpenViewEdit(false)

    const handleDateSelect = (selectInfo) => {
        handleOpen();
    };

    const handleEventClick = (clickInfo) => {
        setTaskId(clickInfo?.event?._def?.extendedProps?._id)
        handleOpenViewEdit()
        if (clickInfo.event.url) {
            clickInfo.jsEvent.preventDefault();
            window.open(clickInfo.event.url);
        }

    };
    const handleEvents = (events) => {
    };

    const renderEventContent = (eventInfo) => (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );

    // delete api
    const deletedata = async () => {
        await apidelete(`task/delete/${taskId}`)
        handleCloseViewEdit()
    }



    const fetchdata = async () => {
        try {
            const result = await apiget(userRole === "admin" ? `task/list` : `task/list/?createdBy=${userid}`);
            if (result && result.status === 200) {
                const datas = result?.data?.result;
                const newData = datas.map((item) => {
                    item.start = moment(item?.start).format('YYYY-MM-DD');
                    item.end = moment(item?.end).format('YYYY-MM-DD');
                    return item;
                })
                setData(newData);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchdata()
    }, [open, openViewEdit, userAction])

    return (
        <div>
            {/* Add Task Model */}
            <AddEvent open={open} handleClose={handleClose} setUserAction={setUserAction} lead='lead' contact='contact' />

            {/* View Edit Model */}
            <ViewEdit open={openViewEdit} handleClose={handleCloseViewEdit} id={taskId} deletedata={deletedata} lead='lead' contact='contact' setUserAction={setUserAction} fetchEvent={fetchdata} />

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Calendar
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
                        Add Event
                    </Button>
                </Stack>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    minHeight="400px"
                    height="600px"
                    // dateClick={handleDateClick}
                    // events={calendarDataCalendar}
                    events={data}

                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    eventClick={handleEventClick}
                    eventsSet={handleEvents}
                    select={handleDateSelect}
                    eventContent={renderEventContent}
                    views={{
                        listWeek: { buttonText: 'List' },
                        multiMonthFourMonth: {
                            type: 'multiMonth',
                            buttonText: 'multiMonth',
                            duration: { months: 4 },
                        }
                    }}
                    buttonText={{
                        today: 'Today',
                        dayGridMonth: 'Month',
                        timeGridWeek: 'Week',
                        timeGridDay: 'Day',
                    }}
                    eventClassNames="custom-fullcalendar"
                />
            </Container>
        </div>
    );

};

export default Calendar;
