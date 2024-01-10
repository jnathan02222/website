import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import appStyles from '../StyleSheets/App.module.css'
import CenterBuffer from './CenterBuffer';

import contactStyles from '../StyleSheets/Contact.module.css'

function Contact(props){
    const form = useRef();
    const [success, setSuccess] = useState(null);
    const contentRef = useRef();
    const [contentHeight, setContentHeight] = useState(0);
    const pageRef = useRef();
    const [pageHeight, setPageHeight] = useState(0);

    useEffect(
        () => {
            const computedContentHeight = parseInt(( window.getComputedStyle(contentRef.current).getPropertyValue("height") ).replace("px", ""));
            setContentHeight(computedContentHeight);
            const computedPageHeight = parseInt(( window.getComputedStyle(pageRef.current).getPropertyValue("height") ).replace("px", ""));
            setPageHeight(computedPageHeight);
        }
    );

    const sendEmail = (e) => {
        e.preventDefault();
        setSuccess(null);

        emailjs.sendForm('service_nervuyi', 'template_3pe33pn', form.current, 'OZryuuECR0N31zpiC').then(
            (result) => {
                setSuccess(true);
                console.log(result.text);
                (form.current).reset();
            }, (error) => {
                setSuccess(false);
                console.log(error.text);
            }
            
        );
    }

    return (
        <div ref={pageRef} className={appStyles.page + " " + props.position}>
            <CenterBuffer pageHeight={pageHeight} menuHeight={props.menuHeight} contentHeight={contentHeight}></CenterBuffer>
            <div className={appStyles.content} ref={contentRef}>
                <div className={contactStyles.contact}>

                    <form ref={form} onSubmit={sendEmail} method='POST'>
                        <h1 className={contactStyles.subtitle}>Contact</h1>
                        <br/>
                        <label className={contactStyles.text}>Name</label>
                        <br/>
                        <input tabIndex="-1" required  className={contactStyles.shortInput} type="text" name="user_name" />
                        <br/> 
                        <label required className={contactStyles.text}>Email</label>
                        <br/>
                        <input tabIndex="-1" required className={contactStyles.shortInput} type="text" name="user_email" />
                        <br/>
                        <label className={contactStyles.text}>Message</label>
                        <br/>
                        <textarea tabIndex="-1" required className={contactStyles.message} name="message" />
                        <br/>
                        <input tabIndex="-1" className={contactStyles.button} type="submit" value="Send" />
                        {success === true    && <div className={contactStyles.responseOk}>Success, thanks for your message!</div>}
                        {success === false && <div className={contactStyles.responseError}>Error, try again.</div>}
                        
                        <h1 className={contactStyles.email}>You can also find me at <u>n25jiang@uwaterloo.ca</u></h1>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;