import { CardActions, CardContent, CardHeader, Divider, Button, TextField, Alert } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, { useState } from "react";
import "./Captcha.css";
export const Captcha = ({ setVerification,setShowCaptcha }) => {

    const randomString = Math.random().toString(36).slice(8);
    const [captcha, setCaptcha] = useState(randomString);
    const [text, setText] = useState("");
    const [valid, setValid] = useState(false);
    const [success, setSuccess] = useState(false);
    const refreshString = () => {
        setText("");
        setCaptcha(Math.random().toString(36).slice(8));
    };

    const matchCaptcha = (event) => {
        event.preventDefault();
        refreshString()
        if (text === captcha) {
            setText("");
            setValid(false);
            setSuccess(true);
            setVerification(true);
            setShowCaptcha(false);
        } else {
            setText("");
            setValid(true);
            setSuccess(false);
        }
    };
    return (
        <React.Fragment>
          
            <div className="captchacard">
                {/* <CardHeader title="Validate Captcha" className="mb-1 text-blue-600" /> */}
                <Divider />
                <CardContent>
                    <CardActions>
                        <div className="captchacontent text-center">{captcha}</div>
                        <Button
                            startIcon={<RefreshIcon />}
                            onClick={() => refreshString()}
                        ></Button>
                    </CardActions>
                    <div className="">
                        <TextField
                            className=""
                            label="Enter Captcha"
                            focused
                            value={text}
                            fullWidth
                            onChange={(e) => setText(e.target.value)}
                            error={valid}
                            helperText={valid && "Invalid Captcha"}
                        />

                        <Button
                            onClick={matchCaptcha}

                            variant="contained"
                            color="success"
                            type="submit"
                            sx={{ marginTop: "10px" }}
                        >
                            Validate Captcha
                        </Button>

                    </div>
                </CardContent>
            </div>

        </React.Fragment>
    );
}