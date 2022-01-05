import React, {useState, useEffect} from 'react'
import db from '../firebase'
import {useParams, useNavigate} from 'react-router-dom'
import * as dat from 'dat.gui';
const tinyid = require('tiny-unique-id')



function Textarea() {
    const {slug} = useParams()
    const [text, setText] = useState('')
    const navigate = useNavigate()
    const keySound = () => {
        const audio = new Audio('sounds/key.mp3');
        audio.volume = 0.2;
        audio.play();
    }
    const handleSave = async () => {
        let slug = tinyid.unique()
        keySound()
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        today =  dd + '/' + mm + '/' + yyyy
        await db.collection('notes').doc(slug).set({
            text: text,
            date: today,
        })
        navigate(`/${slug}`)
    }
    
    const Shortcut = e => {
        if(e.ctrlKey && e.keyCode === 13) {
            e.preventDefault()
            handleSave()
        }
    }

    useEffect(() => {
        const handleLoad = async () => {
            const doc = await db.collection('notes').doc(slug).get()
            setText(doc.data().text)
        }
        handleLoad()
    }, [slug])
    useEffect(() => {
        const settings = async () => {
        const gui = await new dat.GUI({hideable: false});
        const obj = {
            fontSize : 25,
            fontFamily : 'monospace',
        }
        gui.add(obj, 'fontSize').min(8).max(60).step(1).onChange(e => {
            document.querySelector('textarea').style.fontSize = `${e}px`
        })

        gui.add(obj, 'fontFamily', {
            'Monospace': 'monospace',
            'Roboto': 'Roboto',
            'Poppins': 'Poppins',
            'Cursive': 'Cursive',
        }).onChange(e => {
            document.querySelector('textarea').style.fontFamily = e
        })
    }
    setTimeout(settings, 1500)
    }, [])
    return (
        <div onKeyDown={Shortcut}>
            <textarea id="txt" cols="30" rows="10" placeholder="Enter some text!" value={text} onChange={e => setText(e.target.value)} onKeyDown={keySound}></textarea>
        </div>
    )
}

export default Textarea
