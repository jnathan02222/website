import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import appStyles from '../StyleSheets/App.module.css'

import contactStyles from '../StyleSheets/Contact.module.css'

function Contact(props){
    const form = useRef();
    const [success, setSuccess] = useState(null);
    
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
        <div className={appStyles.page + " " + props.position}>

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
    );
}

export default Contact;