import React, { useEffect } from 'react';
import styles from './app.module.css';
import icon from './assets/icon.png';
import { useParams } from 'react-router-dom';

interface RegisterProps {
    redir: string
}

const change_reg_text = (success: boolean, message: string) => {
    const rb = document.getElementById('reg_subtitle');
    if(rb == null) return;

    let cl;
    if(success) cl = "reg_submit_success";
    else cl = "reg_submit_fail";

    rb.classList.remove(cl);
    void rb.offsetWidth;
    rb.classList.add(cl);

    rb.textContent = message;
}

async function createAccount(e: React.ChangeEvent) {
    e.preventDefault();
    const ln = (document.getElementById('ln')! as HTMLInputElement).value;
    const usn = (document.getElementById('usn')! as HTMLInputElement).value;
    const pwd = (document.getElementById('pwd')! as HTMLInputElement).value;
    const salt = (document.getElementById('salt')! as HTMLInputElement).value;
    const refer = (document.getElementById('refer')! as HTMLInputElement).value;
    console.log(`ln=${ln}, usn=${usn}, pwd=${pwd}`)

    await fetch('https://api.jugg.school/user/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            ln: ln,
            usn: usn,
            pwd: pwd,
            salt: salt,
            refer: refer,
            pgp: ''
        })
    })
    .then(res => res.json())
    .then(data => {
        change_reg_text(data['success'], data['message']);
        if(data['success']) {
            setTimeout(() => {
                window.location.href = 'https://jugg.school/login';
            }, 500);
        }
    });
}

const animate = () => {
    const rb = document.getElementById('reg_button');
    if(rb == null) return;

    rb.classList.remove('reg_button_clicked');
    void rb.offsetWidth;
    rb.classList.add('reg_button_clicked');
}

export default function Register({ redir }: RegisterProps) {
    let { ref } = useParams();
    if(!ref) {
        window.location.href = redir;
        return null;
    }

    useEffect(() => {
        const refer_elm = document.getElementById('refer') as HTMLInputElement;
        refer_elm.value = ref;

        setTimeout(() => {
            document.getElementById('content')!.classList.add(styles.fade_in);
        }, 250);
    });

    document.title = 'JS | Register';

    return (
        <div className={styles.content} id='content'>
            <div className={styles.main_content}>
                <div className={styles.reg_text}>
                    <img className={styles.icon} src={icon}></img>
                    <div className={styles.reg_title_container}>
                        <b className={styles.reg_title}>REGISTER</b>
                        <p id='reg_subtitle' className={styles.reg_subtitle}>FOR FREEDOM</p>
                    </div>
                    
                </div>
                <form className={styles.ca_form} onSubmit={createAccount}>
                    <input className={styles.textbox} id='usn' placeholder='Username'></input>
                    <input className={styles.textbox} id='ln' placeholder='Login Name'></input>
                    <input className={styles.textbox} id='pwd' type='password' placeholder='Password'></input>
                    <input className={styles.textbox} id='salt' type='password' placeholder='Salt'></input>
                    <input className={styles.textbox} id='refer' placeholder='Referral' disabled={true}></input>
                    {/*<textarea className={styles.pgpbox} id='pgp' placeholder='PGP Key (Optional)'></textarea>*/}
                    <input className={styles.reg_button} id='reg_button' onClick={animate} type='submit' value='REGISTER'></input>
                </form>
            </div>
        </div>
    )
}
