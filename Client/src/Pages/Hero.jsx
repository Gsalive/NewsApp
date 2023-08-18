import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';

const Hero = () => {
    const [dialog,setDialog]=useState('')
    const [tempdialog,settempDialog]=useState('')
    async function populateDialog() {
        const req = await fetch('https://news-app-api-smoky.vercel.app/api/dialog', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        });
        const data = await req.json();
        if(data.status==='ok'){
            setDialog(data.dialog)
        }else{
            console.log(data.error)
        }
        console.log(data);
    }
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt_decode(token);
            if (!user) {
                localStorage.removeItem('token');
                window.open('/', '_self');
            } else {
                populateDialog()
            }
        }
    }, []);

    async function updatedialog(event){
        event.preventDefault()
        const req = await fetch('https://news-app-api-smoky.vercel.app/api/dialog', {
        method:'POST',   
        headers: {
                'Content-Type':'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                dialog:tempdialog,
            }),
        });
        const data = await req.json();
        if(data.status==='ok'){
            setDialog(tempdialog)
            settempDialog('')
            
        }else{
            alert(data.error)
        }
    }
    return(
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <h2>
                Dialog : {dialog||'No dialog found'}
            </h2>
            <form onSubmit={updatedialog}>
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 undefined"
                >
                    Enter a dialog 
                 </label>
                <div className="flex flex-col items-start">
                    <input
                    value={tempdialog}
                    onChange={(e)=>settempDialog(e.target.value)}
                    type="text"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                     />
                  </div>
                </div>
            </form>
        </div>
    );
}

export default Hero;
