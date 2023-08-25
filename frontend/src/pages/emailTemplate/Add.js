/* eslint-disable arrow-body-style */
import { Box, Button, Container, Grid, Stack } from '@mui/material'
import React, { useRef, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { EmailEditor } from 'react-email-editor';
import Header from '../../components/Header'

const Add = () => {
    const emailEditorRef = useRef(null);
    const [preview, setPreview] = useState(false);
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const togglePreview = () => {
        if (preview) {
            emailEditorRef.current?.editor?.hidePreview();
            setPreview(false);
        } else {
            emailEditorRef.current?.editor?.showPreview('desktop');
            setPreview(true);
        }
    };

    const saveDesign = () => {
        emailEditorRef.current?.exportHtml(async (data) => {
            console.log(data)
            // const { html } = data;
            const html = data.html
            const design = data.design

            // const allData = {
            //     html: html,
            //     design: design,
            //     name: name
            // }
            // console.log(html,"html")
            // const response = await axios.post('http://127.0.0.1:4000/emailtemplate/add', allData)
            alert('Template saved successfully');
        });
    };

    const exportHtml = () => {
        emailEditorRef.current?.exportHtml((data) => {
            console.log(data)
            // const { html } = data;
            // console.log('exportHtml', html);
            alert('Output HTML has been logged in your developer console.');
        });
    };

    const back =()=>{
        navigate('/dashboard/emailtemplate')
    }

    return (
        <div>
            <Container>
                <Grid container display="flex" alignItems="center">
                    <Grid container display="flex" alignItems="center">
                        <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                            <Header
                                title="Create Template"
                            />
                            <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                                <Button variant="contained" color="secondary" onClick={togglePreview}>{preview ? "Show Preview" : "Hide Preview"}</Button>
                                <Button variant="contained" color="secondary">Save</Button>
                                <Button variant="contained" color="secondary" startIcon={<ArrowBackIosIcon />} onClick={back}>Back</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <Box height={"680px"} bgcolor={"gray"} className="editerHeight">
                    <EmailEditor ref={emailEditorRef} />
                </Box>
            </Container>
        </div>
    )
}

export default Add
